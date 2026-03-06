import { describe, it, expect } from 'vitest';
import {
    FILE_LIMITS,
    formatFileSize,
    validateFile,
    getFileExtension,
    isImageFile,
    isPdfFile,
} from './fileValidation';

// Helper to create a mock File
const createMockFile = (
    name: string,
    size: number,
    type: string
): File => {
    const blob = new Blob(['x'.repeat(Math.min(size, 100))], { type });
    Object.defineProperty(blob, 'size', { value: size });
    Object.defineProperty(blob, 'name', { value: name });
    return blob as File;
};

describe('FILE_LIMITS', () => {
    it('should define avatar limits', () => {
        expect(FILE_LIMITS.avatar.maxSize).toBe(5 * 1024 * 1024);
        expect(FILE_LIMITS.avatar.allowedTypes).toContain('image/jpeg');
        expect(FILE_LIMITS.avatar.allowedTypes).toContain('image/png');
    });

    it('should define document limits', () => {
        expect(FILE_LIMITS.document.maxSize).toBe(10 * 1024 * 1024);
        expect(FILE_LIMITS.document.allowedTypes).toContain('application/pdf');
    });

    it('should define credential limits', () => {
        expect(FILE_LIMITS.credential.maxSize).toBe(15 * 1024 * 1024);
    });
});

describe('formatFileSize', () => {
    it('should format 0 bytes', () => {
        expect(formatFileSize(0)).toBe('0 Bytes');
    });

    it('should format bytes', () => {
        expect(formatFileSize(500)).toBe('500 Bytes');
    });

    it('should format kilobytes', () => {
        expect(formatFileSize(1024)).toBe('1 KB');
        expect(formatFileSize(1536)).toBe('1.5 KB');
    });

    it('should format megabytes', () => {
        expect(formatFileSize(1024 * 1024)).toBe('1 MB');
        expect(formatFileSize(5 * 1024 * 1024)).toBe('5 MB');
    });

    it('should format gigabytes', () => {
        expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
    });
});

describe('validateFile', () => {
    it('should accept valid avatar image', () => {
        const file = createMockFile('photo.jpg', 1024 * 1024, 'image/jpeg');
        expect(validateFile(file, 'avatar')).toEqual({ valid: true });
    });

    it('should reject oversized avatar', () => {
        const file = createMockFile('big.jpg', 6 * 1024 * 1024, 'image/jpeg');
        const result = validateFile(file, 'avatar');
        expect(result.valid).toBe(false);
        expect(result.error).toContain('too large');
    });

    it('should reject invalid file type for avatar', () => {
        const file = createMockFile('doc.pdf', 1024, 'application/pdf');
        const result = validateFile(file, 'avatar');
        expect(result.valid).toBe(false);
        expect(result.error).toContain('Invalid file type');
    });

    it('should accept PDF for document type', () => {
        const file = createMockFile('doc.pdf', 1024, 'application/pdf');
        expect(validateFile(file, 'document')).toEqual({ valid: true });
    });

    it('should reject oversized document', () => {
        const file = createMockFile('huge.pdf', 11 * 1024 * 1024, 'application/pdf');
        const result = validateFile(file, 'document');
        expect(result.valid).toBe(false);
    });

    it('should accept webp for credential type', () => {
        const file = createMockFile('cert.webp', 1024, 'image/webp');
        expect(validateFile(file, 'credential')).toEqual({ valid: true });
    });

    it('should default to avatar type', () => {
        const file = createMockFile('photo.png', 1024, 'image/png');
        expect(validateFile(file)).toEqual({ valid: true });
    });

    it('should accept gif for avatar', () => {
        const file = createMockFile('anim.gif', 1024, 'image/gif');
        expect(validateFile(file, 'avatar')).toEqual({ valid: true });
    });
});

describe('getFileExtension', () => {
    it('should extract extension', () => {
        expect(getFileExtension('photo.jpg')).toBe('.jpg');
        expect(getFileExtension('document.pdf')).toBe('.pdf');
    });

    it('should handle uppercase extensions', () => {
        expect(getFileExtension('PHOTO.JPG')).toBe('.jpg');
    });

    it('should handle multiple dots', () => {
        expect(getFileExtension('file.name.tar.gz')).toBe('.gz');
    });

    it('should return empty string for no extension', () => {
        expect(getFileExtension('filename')).toBe('');
    });
});

describe('isImageFile', () => {
    it('should return true for image types', () => {
        expect(isImageFile(createMockFile('a.jpg', 1, 'image/jpeg'))).toBe(true);
        expect(isImageFile(createMockFile('a.png', 1, 'image/png'))).toBe(true);
        expect(isImageFile(createMockFile('a.webp', 1, 'image/webp'))).toBe(true);
    });

    it('should return false for non-image types', () => {
        expect(isImageFile(createMockFile('a.pdf', 1, 'application/pdf'))).toBe(false);
        expect(isImageFile(createMockFile('a.txt', 1, 'text/plain'))).toBe(false);
    });
});

describe('isPdfFile', () => {
    it('should return true for PDF', () => {
        expect(isPdfFile(createMockFile('a.pdf', 1, 'application/pdf'))).toBe(true);
    });

    it('should return false for non-PDF', () => {
        expect(isPdfFile(createMockFile('a.jpg', 1, 'image/jpeg'))).toBe(false);
    });
});
