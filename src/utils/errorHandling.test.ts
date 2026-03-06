import { describe, it, expect, vi } from 'vitest';
import { ApiError } from '@/lib/api';
import {
    AppError,
    ERROR_MESSAGES,
    handleApiError,
    getErrorMessage,
    logAndGetMessage,
    isErrorCode,
    requiresReauth,
    isNetworkError,
    extractFieldErrors,
} from './errorHandling';

describe('AppError', () => {
    it('should create an error with code and statusCode', () => {
        const error = new AppError('test', 'NOT_FOUND', 404, false);
        expect(error.message).toBe('test');
        expect(error.code).toBe('NOT_FOUND');
        expect(error.statusCode).toBe(404);
        expect(error.recoverable).toBe(false);
        expect(error.name).toBe('AppError');
    });

    it('should default recoverable to true', () => {
        const error = new AppError('test', 'UNKNOWN');
        expect(error.recoverable).toBe(true);
    });

    describe('fromApiError', () => {
        it('should map 401 to AUTH_EXPIRED', () => {
            const apiError = new ApiError('Unauthorized', 401);
            const appError = AppError.fromApiError(apiError);
            expect(appError.code).toBe('AUTH_EXPIRED');
            expect(appError.statusCode).toBe(401);
            expect(appError.recoverable).toBe(false);
        });

        it('should map 404 to NOT_FOUND', () => {
            const apiError = new ApiError('Not found', 404);
            const appError = AppError.fromApiError(apiError);
            expect(appError.code).toBe('NOT_FOUND');
            expect(appError.recoverable).toBe(false);
        });

        it('should map 500 to SERVER_ERROR', () => {
            const apiError = new ApiError('Server error', 500);
            const appError = AppError.fromApiError(apiError);
            expect(appError.code).toBe('SERVER_ERROR');
            expect(appError.recoverable).toBe(true);
        });

        it('should map 429 to RATE_LIMITED', () => {
            const apiError = new ApiError('Rate limited', 429);
            const appError = AppError.fromApiError(apiError);
            expect(appError.code).toBe('RATE_LIMITED');
            expect(appError.recoverable).toBe(true);
        });

        it('should map 0 to NETWORK_ERROR', () => {
            const apiError = new ApiError('Network', 0);
            const appError = AppError.fromApiError(apiError);
            expect(appError.code).toBe('NETWORK_ERROR');
        });

        it('should map 400 to VALIDATION_ERROR', () => {
            const apiError = new ApiError('Bad request', 400);
            const appError = AppError.fromApiError(apiError);
            expect(appError.code).toBe('VALIDATION_ERROR');
        });

        it('should map 403 to FORBIDDEN', () => {
            const apiError = new ApiError('Forbidden', 403);
            const appError = AppError.fromApiError(apiError);
            expect(appError.code).toBe('FORBIDDEN');
            expect(appError.recoverable).toBe(false);
        });

        it('should map 408 to TIMEOUT', () => {
            const apiError = new ApiError('Timeout', 408);
            const appError = AppError.fromApiError(apiError);
            expect(appError.code).toBe('TIMEOUT');
        });

        it('should map unknown status to UNKNOWN', () => {
            const apiError = new ApiError('Weird', 418);
            const appError = AppError.fromApiError(apiError);
            expect(appError.code).toBe('UNKNOWN');
        });
    });

    describe('fromUnknown', () => {
        it('should return same AppError if already AppError', () => {
            const original = new AppError('test', 'NOT_FOUND');
            expect(AppError.fromUnknown(original)).toBe(original);
        });

        it('should convert ApiError', () => {
            const apiError = new ApiError('error', 404);
            const result = AppError.fromUnknown(apiError);
            expect(result.code).toBe('NOT_FOUND');
        });

        it('should detect network errors from Error message', () => {
            const error = new Error('Failed to fetch');
            const result = AppError.fromUnknown(error);
            expect(result.code).toBe('NETWORK_ERROR');
        });

        it('should detect network keyword in Error message', () => {
            const error = new Error('network error occurred');
            const result = AppError.fromUnknown(error);
            expect(result.code).toBe('NETWORK_ERROR');
        });

        it('should wrap generic Error as UNKNOWN', () => {
            const error = new Error('something broke');
            const result = AppError.fromUnknown(error);
            expect(result.code).toBe('UNKNOWN');
            expect(result.message).toBe('something broke');
        });

        it('should handle non-Error values', () => {
            const result = AppError.fromUnknown('string error');
            expect(result.code).toBe('UNKNOWN');
            expect(result.message).toBe(ERROR_MESSAGES.UNKNOWN);
        });

        it('should handle null/undefined', () => {
            expect(AppError.fromUnknown(null).code).toBe('UNKNOWN');
            expect(AppError.fromUnknown(undefined).code).toBe('UNKNOWN');
        });
    });
});

describe('handleApiError', () => {
    it('should return AppError from unknown error', () => {
        const result = handleApiError(new Error('test'));
        expect(result).toBeInstanceOf(AppError);
    });
});

describe('getErrorMessage', () => {
    it('should return AppError message directly', () => {
        const error = new AppError('Custom message', 'NOT_FOUND');
        expect(getErrorMessage(error)).toBe('Custom message');
    });

    it('should map ApiError status to message', () => {
        const error = new ApiError('error', 404);
        expect(getErrorMessage(error)).toBe(ERROR_MESSAGES.NOT_FOUND);
    });

    it('should detect fetch errors as network errors', () => {
        const error = new Error('Failed to load resource');
        expect(getErrorMessage(error)).toBe(ERROR_MESSAGES.NETWORK_ERROR);
    });

    it('should return Error message for generic errors', () => {
        const error = new Error('something went wrong');
        expect(getErrorMessage(error)).toBe('something went wrong');
    });

    it('should return UNKNOWN for non-Error types', () => {
        expect(getErrorMessage('string')).toBe(ERROR_MESSAGES.UNKNOWN);
        expect(getErrorMessage(42)).toBe(ERROR_MESSAGES.UNKNOWN);
    });
});

describe('logAndGetMessage', () => {
    it('should log error and return message', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const error = new AppError('test', 'NOT_FOUND');
        const message = logAndGetMessage(error, 'TestContext');
        expect(consoleSpy).toHaveBeenCalledWith('[TestContext]', error);
        expect(message).toBe('test');
        consoleSpy.mockRestore();
    });

    it('should use default context label', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        logAndGetMessage(new Error('test'));
        expect(consoleSpy).toHaveBeenCalledWith('[Error]', expect.any(Error));
        consoleSpy.mockRestore();
    });
});

describe('isErrorCode', () => {
    it('should return true for matching code', () => {
        const error = new AppError('test', 'NOT_FOUND');
        expect(isErrorCode(error, 'NOT_FOUND')).toBe(true);
    });

    it('should return false for non-matching code', () => {
        const error = new AppError('test', 'NOT_FOUND');
        expect(isErrorCode(error, 'TIMEOUT')).toBe(false);
    });

    it('should return false for non-AppError', () => {
        expect(isErrorCode(new Error('test'), 'NOT_FOUND')).toBe(false);
    });
});

describe('requiresReauth', () => {
    it('should return true for AUTH_EXPIRED', () => {
        expect(requiresReauth(new AppError('test', 'AUTH_EXPIRED'))).toBe(true);
    });

    it('should return true for AUTH_INVALID', () => {
        expect(requiresReauth(new AppError('test', 'AUTH_INVALID'))).toBe(true);
    });

    it('should return false for other codes', () => {
        expect(requiresReauth(new AppError('test', 'NOT_FOUND'))).toBe(false);
        expect(requiresReauth(new AppError('test', 'NETWORK_ERROR'))).toBe(false);
    });
});

describe('isNetworkError', () => {
    it('should return true for NETWORK_ERROR', () => {
        expect(isNetworkError(new AppError('test', 'NETWORK_ERROR'))).toBe(true);
    });

    it('should return true for TIMEOUT', () => {
        expect(isNetworkError(new AppError('test', 'TIMEOUT'))).toBe(true);
    });

    it('should return false for other codes', () => {
        expect(isNetworkError(new AppError('test', 'SERVER_ERROR'))).toBe(false);
    });
});

describe('extractFieldErrors', () => {
    it('should extract errors array from ApiError data', () => {
        const error = new ApiError('error', 400, {
            errors: [
                { field: 'email', message: 'Invalid email' },
                { field: 'name', message: 'Required' },
            ],
        });
        const result = extractFieldErrors(error);
        expect(result).toEqual([
            { field: 'email', message: 'Invalid email' },
            { field: 'name', message: 'Required' },
        ]);
    });

    it('should extract from fields object', () => {
        const error = new ApiError('error', 400, {
            fields: { email: 'Invalid', name: 'Required' },
        });
        const result = extractFieldErrors(error);
        expect(result).toEqual([
            { field: 'email', message: 'Invalid' },
            { field: 'name', message: 'Required' },
        ]);
    });

    it('should return empty array for non-ApiError', () => {
        expect(extractFieldErrors(new Error('test'))).toEqual([]);
    });

    it('should return empty array for ApiError without data', () => {
        expect(extractFieldErrors(new ApiError('error', 400))).toEqual([]);
    });

    it('should return empty array for ApiError with data but no errors/fields', () => {
        expect(extractFieldErrors(new ApiError('error', 400, { other: 'data' }))).toEqual([]);
    });
});

describe('ERROR_MESSAGES', () => {
    it('should have a message for every error code', () => {
        const codes = [
            'NETWORK_ERROR', 'AUTH_EXPIRED', 'AUTH_INVALID', 'NOT_FOUND',
            'FORBIDDEN', 'VALIDATION_ERROR', 'SERVER_ERROR', 'RATE_LIMITED',
            'TIMEOUT', 'UNKNOWN',
        ] as const;
        for (const code of codes) {
            expect(ERROR_MESSAGES[code]).toBeDefined();
            expect(typeof ERROR_MESSAGES[code]).toBe('string');
            expect(ERROR_MESSAGES[code].length).toBeGreaterThan(0);
        }
    });
});
