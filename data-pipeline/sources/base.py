"""
Abstract base class for data source processors.
"""

import os
import time
import logging
from abc import ABC, abstractmethod
from dataclasses import dataclass, field

import requests

from config import MAX_RETRIES, RETRY_BACKOFF, REQUEST_TIMEOUT
from mapping.lookups import LookupTables
from output.writer import CSVWriter

logger = logging.getLogger(__name__)


@dataclass
class SourceStats:
    """Statistics for a single source processing run."""
    source_name: str
    raw_records: int = 0
    filtered_records: int = 0
    providers_written: int = 0
    locations_written: int = 0
    specialties_written: int = 0
    languages_written: int = 0
    insurance_written: int = 0
    errors: int = 0
    skipped: int = 0
    duration_sec: float = 0.0

    def to_dict(self) -> dict:
        return {
            "source": self.source_name,
            "raw_records": self.raw_records,
            "filtered_records": self.filtered_records,
            "providers_written": self.providers_written,
            "locations_written": self.locations_written,
            "specialties_written": self.specialties_written,
            "languages_written": self.languages_written,
            "insurance_written": self.insurance_written,
            "errors": self.errors,
            "skipped": self.skipped,
            "duration_sec": round(self.duration_sec, 1),
        }


class BaseSource(ABC):
    """Abstract base class for data source processors."""

    def __init__(
        self,
        lookups: LookupTables,
        writer: CSVWriter,
        data_dir: str,
        seen_npis: set[str] | None = None,
        dry_run: bool = False,
        limit: int | None = None,
    ):
        self.lookups = lookups
        self.writer = writer
        self.data_dir = data_dir
        self.seen_npis = seen_npis or set()
        self.dry_run = dry_run
        self.limit = limit
        self.stats = SourceStats(source_name=self.source_name)

        os.makedirs(self.data_dir, exist_ok=True)

    @property
    @abstractmethod
    def source_name(self) -> str:
        """Identifier for this source (e.g., 'nppes', 'samhsa')."""
        ...

    @abstractmethod
    def process(self) -> SourceStats:
        """Download, filter, transform, and write data. Returns stats."""
        ...

    def download_file(self, url: str, dest_path: str, desc: str = "") -> bool:
        """Download a file with retry logic. Returns True on success."""
        if os.path.exists(dest_path):
            size_mb = os.path.getsize(dest_path) / (1024 * 1024)
            logger.info(f"  File already exists: {dest_path} ({size_mb:.1f} MB)")
            return True

        for attempt in range(1, MAX_RETRIES + 1):
            try:
                logger.info(
                    f"  Downloading {desc or url} (attempt {attempt}/{MAX_RETRIES})..."
                )
                response = requests.get(url, stream=True, timeout=REQUEST_TIMEOUT)
                response.raise_for_status()

                total = int(response.headers.get("content-length", 0))
                downloaded = 0

                with open(dest_path, "wb") as f:
                    for chunk in response.iter_content(chunk_size=8192 * 10):
                        f.write(chunk)
                        downloaded += len(chunk)
                        if total > 0:
                            pct = (downloaded / total) * 100
                            if downloaded % (50 * 1024 * 1024) < 8192 * 10:
                                logger.info(
                                    f"    {downloaded / 1024 / 1024:.0f} MB "
                                    f"/ {total / 1024 / 1024:.0f} MB ({pct:.0f}%)"
                                )

                size_mb = os.path.getsize(dest_path) / (1024 * 1024)
                logger.info(f"  Downloaded: {dest_path} ({size_mb:.1f} MB)")
                return True

            except requests.RequestException as e:
                logger.warning(f"  Download failed (attempt {attempt}): {e}")
                if os.path.exists(dest_path):
                    os.remove(dest_path)
                if attempt < MAX_RETRIES:
                    wait = RETRY_BACKOFF ** attempt
                    logger.info(f"  Retrying in {wait}s...")
                    time.sleep(wait)

        logger.error(f"  Failed to download after {MAX_RETRIES} attempts: {url}")
        return False

    def clean_phone(self, phone) -> str | None:
        """Clean phone number to formatted string."""
        if not phone or (isinstance(phone, float)):
            return None
        digits = "".join(c for c in str(phone) if c.isdigit())
        if len(digits) == 10:
            return f"({digits[:3]}) {digits[3:6]}-{digits[6:]}"
        if len(digits) == 11 and digits[0] == "1":
            digits = digits[1:]
            return f"({digits[:3]}) {digits[3:6]}-{digits[6:]}"
        return digits if digits else None

    def clean_zip(self, zip_code) -> str | None:
        """Extract 5-digit zip code."""
        if not zip_code or (isinstance(zip_code, float)):
            return None
        z = str(zip_code).strip()[:5]
        return z if len(z) == 5 and z.isdigit() else None

    def timed_process(self) -> SourceStats:
        """Run process() with timing."""
        start = time.time()
        stats = self.process()
        stats.duration_sec = time.time() - start
        return stats
