/**
 * ERROR HANDLING
 *
 * Standardized error responses for all Edge Functions
 */

import { createCorsResponse } from './cors.ts';
import type { ErrorResponse } from './validation.ts';

export interface ErrorCode {
  code: string;
  status: number;
  defaultMessage: string;
}

// Standard error codes
export const ERROR_CODES = {
  // Validation errors (400)
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    status: 400,
    defaultMessage: 'Request validation failed',
  },
  INVALID_ASSESSMENT_ID: {
    code: 'INVALID_ASSESSMENT_ID',
    status: 400,
    defaultMessage: 'Invalid or missing assessment ID',
  },
  INVALID_RESPONSES: {
    code: 'INVALID_RESPONSES',
    status: 400,
    defaultMessage: 'Invalid assessment responses',
  },

  // Authentication errors (401)
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    status: 401,
    defaultMessage: 'Authentication required',
  },
  INVALID_TOKEN: {
    code: 'INVALID_TOKEN',
    status: 401,
    defaultMessage: 'Invalid or expired authentication token',
  },

  // Authorization errors (403)
  FORBIDDEN: {
    code: 'FORBIDDEN',
    status: 403,
    defaultMessage: 'You do not have permission to access this resource',
  },

  // Not found errors (404)
  NOT_FOUND: {
    code: 'NOT_FOUND',
    status: 404,
    defaultMessage: 'Resource not found',
  },
  ASSESSMENT_NOT_FOUND: {
    code: 'ASSESSMENT_NOT_FOUND',
    status: 404,
    defaultMessage: 'Assessment not found or access denied',
  },
  SHARE_TOKEN_NOT_FOUND: {
    code: 'SHARE_TOKEN_NOT_FOUND',
    status: 404,
    defaultMessage: 'Share link not found, expired, or already used',
  },

  // Conflict errors (409)
  RETAKE_TOO_SOON: {
    code: 'RETAKE_TOO_SOON',
    status: 409,
    defaultMessage: 'Assessment cannot be retaken yet',
  },
  ASSESSMENT_ALREADY_COMPLETED: {
    code: 'ASSESSMENT_ALREADY_COMPLETED',
    status: 409,
    defaultMessage: 'This assessment has already been completed',
  },

  // Rate limiting (429)
  RATE_LIMIT_EXCEEDED: {
    code: 'RATE_LIMIT_EXCEEDED',
    status: 429,
    defaultMessage: 'Rate limit exceeded. Please try again later.',
  },

  // Server errors (500)
  INTERNAL_ERROR: {
    code: 'INTERNAL_ERROR',
    status: 500,
    defaultMessage: 'An internal server error occurred',
  },
  DATABASE_ERROR: {
    code: 'DATABASE_ERROR',
    status: 500,
    defaultMessage: 'Database operation failed',
  },
  ENCRYPTION_ERROR: {
    code: 'ENCRYPTION_ERROR',
    status: 500,
    defaultMessage: 'Encryption/decryption failed',
  },
} as const;

/**
 * Create standardized error response
 */
export function createErrorResponse(
  errorCode: ErrorCode,
  message?: string,
  details?: Record<string, unknown>
): Response {
  const body: ErrorResponse = {
    error: {
      code: errorCode.code,
      message: message || errorCode.defaultMessage,
      ...(details && { details }),
    },
  };

  return createCorsResponse(JSON.stringify(body), {
    status: errorCode.status,
  });
}

/**
 * Create validation error response with field-level details
 */
export function createValidationError(
  errors: Record<string, string[]> | string
): Response {
  const details = typeof errors === 'string'
    ? { message: errors }
    : errors;

  return createErrorResponse(
    ERROR_CODES.VALIDATION_ERROR,
    'Request validation failed',
    details
  );
}

/**
 * Create rate limit error with retry information
 */
export function createRateLimitError(resetAt: Date): Response {
  return createErrorResponse(
    ERROR_CODES.RATE_LIMIT_EXCEEDED,
    `Rate limit exceeded. Try again after ${resetAt.toISOString()}`,
    {
      retry_after: resetAt.toISOString(),
      retry_after_seconds: Math.ceil((resetAt.getTime() - Date.now()) / 1000),
    }
  );
}

/**
 * Create retake gate error with next available date
 */
export function createRetakeTooSoonError(nextAvailableAt: Date): Response {
  return createErrorResponse(
    ERROR_CODES.RETAKE_TOO_SOON,
    `Next assessment available on ${nextAvailableAt.toLocaleDateString()}`,
    {
      next_available_at: nextAvailableAt.toISOString(),
      days_remaining: Math.ceil((nextAvailableAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    }
  );
}

/**
 * Log error for observability (structured logging)
 */
export function logError(
  functionName: string,
  error: Error | unknown,
  context?: Record<string, unknown>
): void {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;

  console.error(JSON.stringify({
    timestamp: new Date().toISOString(),
    function: functionName,
    error: errorMessage,
    stack: errorStack,
    ...context,
  }));
}

/**
 * Handle unexpected errors and return appropriate response
 */
export function handleUnexpectedError(
  functionName: string,
  error: Error | unknown
): Response {
  logError(functionName, error);

  // In production, don't expose internal error details
  const isProduction = Deno.env.get('DENO_ENV') === 'production';

  if (isProduction) {
    return createErrorResponse(ERROR_CODES.INTERNAL_ERROR);
  } else {
    // In development, include error details for debugging
    const errorMessage = error instanceof Error ? error.message : String(error);
    return createErrorResponse(
      ERROR_CODES.INTERNAL_ERROR,
      `Internal error: ${errorMessage}`
    );
  }
}
