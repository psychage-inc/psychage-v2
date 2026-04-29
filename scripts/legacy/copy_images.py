import os
import shutil

source_dir = "/Users/raiyanabdullah/Downloads/psychage home page poster"
dest_base = "src/assets/images/homepage"

files_map = {
    "figures": {
        "A-1.jpeg": "A-01-listener.webp",
        "A-2.jpeg": "A-02-supporter.webp",
        "A-3.jpeg": "A-03-seeker.webp",
        "A-4.jpeg": "A-04-resting.webp",
        "A-5.jpeg": "A-05-rising.webp",
        "A-6.jpeg": "A-06-holder.webp",
        "A-7.jpeg": "A-07-gazer.webp",
        "A-8.jpeg": "A-08-open.webp"
    },
    "objects": {
        "B-1.jpeg": "B-01-sphere-cluster.webp",
        "B-2.jpeg": "B-02-thin-arc.webp",
        "B-3.jpeg": "B-03-soft-cube.webp",
        "B-4.jpeg": "B-04-floating-disc.webp",
        "B-5.jpeg": "B-05-paired-pebbles.webp",
        "B-6.jpeg": "B-06-thread-loop.webp",
        "B-7.jpeg": "B-07-tiny-pyramid.webp",
        "B-8.jpeg": "B-08-nested-bowls.webp",
        "B-9.jpeg": "B-09-single-droplet.webp",
        "B-10.jpeg": "B-10-scattered-seeds.webp",
        "B-11.jpeg": "B-11-gentle-helix.webp",
        "B-12.jpeg": "B-12-resting-ring.webp"
    },
    "scenes": {
        "C-1.jpeg": "C-01-turning.webp",
        "C-2.jpeg": "C-02-score.webp",
        "C-3.jpeg": "C-03-companion.webp",
        "C-4.jpeg": "C-04-rhythm.webp",
        "C-5.jpeg": "C-05-architecture.webp",
        "C-6.jpeg": "C-06-map.webp",
        "C-7.jpeg": "C-07-relationship.webp"
    }
}

os.makedirs(os.path.join(dest_base, "figures"), exist_ok=True)
os.makedirs(os.path.join(dest_base, "objects"), exist_ok=True)
os.makedirs(os.path.join(dest_base, "scenes"), exist_ok=True)

for folder, mapping in files_map.items():
    for src, dst in mapping.items():
        src_path = os.path.join(source_dir, src)
        dst_path = os.path.join(dest_base, folder, dst)
        if os.path.exists(src_path):
            print(f"Copying {src} -> {dst}")
            shutil.copy2(src_path, dst_path)
        else:
            print(f"File not found: {src_path}")
print("Done")
