/**
 * Standardized error handling utilities
 */

import { ApiError } from '@/lib/api';

/**
 * Application error class with structured error information
 */
export class AppError extends Error {
    constructor(
        message: string,
        public code: ErrorCode,
        public statusCode?: number,
        public recoverable: boolean = true,
        public context?: Record<string, unknown>
    ) {
        super(message);
        this.name = 'AppError';
    }

    static fromApiError(error: ApiError): AppError {
        const code = getErrorCodeFromStatus(error.status);
        return new AppError(
            ERROR_MESSAGES[code],
            code,
            error.status,
            isRecoverableError(code)
        );
    }

    static fromUnknown(error: unknown): AppError {
        if (error instanceof AppError) {
            return error;
        }

        if (error instanceof ApiError) {
            return AppError.fromApiError(error);
        }

        if (error instanceof Error) {
            // Check for network errors
            if (error.message.includes('fetch') || error.message.includes('network')) {
                return new AppError(ERROR_MESSAGES.NETWORK_ERROR, 'NETWORK_ERROR', 0, true);
            }
            return new AppError(error.message, 'UNKNOWN', undefined, true);
        }

        return new AppError(ERROR_MESSAGES.UNKNOWN, 'UNKNOWN', undefined, true);
    }
}

/**
 * Error codes used throughout the application
 */
export type ErrorCode =
    | 'NETWORK_ERROR'
    | 'AUTH_EXPIRED'
    | 'AUTH_INVALID'
    | 'NOT_FOUND'
    | 'FORBIDDEN'
    | 'VALIDATION_ERROR'
    | 'SERVER_ERROR'
    | 'RATE_LIMITED'
    | 'TIMEOUT'
    | 'UNKNOWN';

/**
 * User-friendly error messages
 */
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
    NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
    AUTH_EXPIRED: 'Your session has expired. Please log in again.',
    AUTH_INVALID: 'Invalid credentials. Please check and try again.',
    NOT_FOUND: 'The requested resource was not found.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    SERVER_ERROR: 'Something went wrong on our end. Please try again later.',
    RATE_LIMITED: 'Too many requests. Please wait a moment and try again.',
    TIMEOUT: 'The request took too long. Please try again.',
    UNKNOWN: 'An unexpected error occurred. Please try again.',
};

/**
 * Map HTTP status codes to error codes
 */
const getErrorCodeFromStatus = (status: number): ErrorCode => {
    switch (status) {
        case 0:
            return 'NETWORK_ERROR';
        case 400:
            return 'VALIDATION_ERROR';
        case 401:
            return 'AUTH_EXPIRED';
        case 403:
            return 'FORBIDDEN';
        case 404:
            return 'NOT_FOUND';
        case 408:
            return 'TIMEOUT';
        case 429:
            return 'RATE_LIMITED';
        case 500:
        case 502:
        case 503:
        case 504:
            return 'SERVER_ERROR';
        default:
            return 'UNKNOWN';
    }
};

/**
 * Check if an error is recoverable (user can retry)
 */
const isRecoverableError = (code: ErrorCode): boolean => {
    const nonRecoverable: ErrorCode[] = ['AUTH_EXPIRED', 'AUTH_INVALID', 'FORBIDDEN', 'NOT_FOUND'];
    return !nonRecoverable.includes(code);
};

/**
 * Handle API errors and return standardized AppError
 */
export const handleApiError = (error: unknown): AppError => {
    return AppError.fromUnknown(error);
};

/**
 * Get user-friendly message from any error
 */
export const getErrorMessage = (error: unknown): string => {
    if (error instanceof AppError) {
        return error.message;
    }

    if (error instanceof ApiError) {
        return ERROR_MESSAGES[getErrorCodeFromStatus(error.status)];
    }

    if (error instanceof Error) {
        // Don't expose internal error messages to users
        if (error.message.includes('fetch') || error.message.includes('Failed')) {
            return ERROR_MESSAGES.NETWORK_ERROR;
        }
        return error.message;
    }

    return ERROR_MESSAGES.UNKNOWN;
};

/**
 * Log error for debugging while returning safe message
 */
export const logAndGetMessage = (error: unknown, context?: string): string => {
    console.error(`[${context || 'Error'}]`, error);
    return getErrorMessage(error);
};

/**
 * Type guard to check if error has a specific code
 */
export const isErrorCode = (error: unknown, code: ErrorCode): boolean => {
    return error instanceof AppError && error.code === code;
};

/**
 * Check if error requires re-authentication
 */
export const requiresReauth = (error: unknown): boolean => {
    return isErrorCode(error, 'AUTH_EXPIRED') || isErrorCode(error, 'AUTH_INVALID');
};

/**
 * Check if error is a network/connectivity issue
 */
export const isNetworkError = (error: unknown): boolean => {
    return isErrorCode(error, 'NETWORK_ERROR') || isErrorCode(error, 'TIMEOUT');
};

/**
 * Extract validation errors from API response
 */
export interface FieldError {
    field: string;
    message: string;
}

export const extractFieldErrors = (error: unknown): FieldError[] => {
    if (error instanceof ApiError && error.data) {
        const data = error.data as Record<string, unknown>;
        if (data.errors && Array.isArray(data.errors)) {
            return data.errors as FieldError[];
        }
        if (data.fields && typeof data.fields === 'object') {
            return Object.entries(data.fields).map(([field, message]) => ({
                field,
                message: String(message)
            }));
        }
    }
    return [];
};
