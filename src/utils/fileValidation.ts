/**
 * File validation utilities for image and document uploads
 */

export const FILE_LIMITS = {
    avatar: {
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
        maxWidth: 2000,
        maxHeight: 2000,
    },
    document: {
        maxSize: 10 * 1024 * 1024, // 10MB
        allowedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
        allowedExtensions: ['.pdf', '.jpg', '.jpeg', '.png'],
    },
    credential: {
        maxSize: 15 * 1024 * 1024, // 15MB
        allowedTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
        allowedExtensions: ['.pdf', '.jpg', '.jpeg', '.png', '.webp'],
    }
} as const;

export type FileType = keyof typeof FILE_LIMITS;

export interface ValidationResult {
    valid: boolean;
    error?: string;
}

export interface ImageDimensions {
    width: number;
    height: number;
}

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Validate file type and size
 */
export const validateFile = (
    file: File,
    fileType: FileType = 'avatar'
): ValidationResult => {
    const limits = FILE_LIMITS[fileType];

    // Check file size
    if (file.size > limits.maxSize) {
        return {
            valid: false,
            error: `File too large. Maximum size is ${formatFileSize(limits.maxSize)}`
        };
    }

    // Check file type - use readonly array casting for includes check
    const allowedTypes = limits.allowedTypes as readonly string[];
    if (!allowedTypes.includes(file.type)) {
        const allowedExts = (limits.allowedExtensions as readonly string[]).join(', ');
        return {
            valid: false,
            error: `Invalid file type. Allowed formats: ${allowedExts}`
        };
    }

    return { valid: true };
};

/**
 * Validate image dimensions
 */
export const validateImageDimensions = async (
    file: File,
    maxWidth: number = FILE_LIMITS.avatar.maxWidth,
    maxHeight: number = FILE_LIMITS.avatar.maxHeight
): Promise<ValidationResult> => {
    return new Promise((resolve) => {
        // Only validate if it's an image
        if (!file.type.startsWith('image/')) {
            resolve({ valid: true });
            return;
        }

        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(objectUrl);

            if (img.width > maxWidth || img.height > maxHeight) {
                resolve({
                    valid: false,
                    error: `Image dimensions too large. Maximum: ${maxWidth}x${maxHeight}px. Your image: ${img.width}x${img.height}px`
                });
            } else {
                resolve({ valid: true });
            }
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve({
                valid: false,
                error: 'Unable to read image. The file may be corrupted.'
            });
        };

        img.src = objectUrl;
    });
};

/**
 * Get image dimensions from file
 */
export const getImageDimensions = async (file: File): Promise<ImageDimensions | null> => {
    return new Promise((resolve) => {
        if (!file.type.startsWith('image/')) {
            resolve(null);
            return;
        }

        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(objectUrl);
            resolve({ width: img.width, height: img.height });
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(null);
        };

        img.src = objectUrl;
    });
};

/**
 * Full file validation (type, size, and optionally dimensions)
 */
export const validateFileComplete = async (
    file: File,
    fileType: FileType = 'avatar',
    checkDimensions: boolean = true
): Promise<ValidationResult> => {
    // Basic validation
    const basicResult = validateFile(file, fileType);
    if (!basicResult.valid) {
        return basicResult;
    }

    // Dimension validation for images
    if (checkDimensions && fileType === 'avatar' && file.type.startsWith('image/')) {
        const { maxWidth, maxHeight } = FILE_LIMITS.avatar;
        const dimensionResult = await validateImageDimensions(file, maxWidth, maxHeight);
        if (!dimensionResult.valid) {
            return dimensionResult;
        }
    }

    return { valid: true };
};

/**
 * Get file extension from filename
 */
export const getFileExtension = (filename: string): string => {
    const parts = filename.split('.');
    return parts.length > 1 ? `.${parts.pop()?.toLowerCase()}` : '';
};

/**
 * Check if file is an image
 */
export const isImageFile = (file: File): boolean => {
    return file.type.startsWith('image/');
};

/**
 * Check if file is a PDF
 */
export const isPdfFile = (file: File): boolean => {
    return file.type === 'application/pdf';
};

/**
 * Create a preview URL for an image file
 * Remember to revoke the URL when done using URL.revokeObjectURL()
 */
export const createImagePreview = (file: File): string | null => {
    if (!isImageFile(file)) {
        return null;
    }
    return URL.createObjectURL(file);
};
