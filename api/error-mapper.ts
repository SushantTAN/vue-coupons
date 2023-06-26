import type { AxiosError } from "axios";

export const StatusCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  RESOURCE_NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
};

export const Messages = {
  CONFLICT: "conflict",
  UNEXPECTED: "unexpected",
  BAD_REQUEST: "bad_request",
  NOT_ALLOWED: "not_allowed",
  UNAUTHORIZED: "unauthorized",
  GENERAL_NETWORK_ERROR: "general",
  SERVER_NOT_RESPONDING: "server_not_responding",
  NO_INTERNET_CONNECTION: "no_internet_connection",
};

function errorCodeMessage(code?: number): string {
  switch (code) {
    case StatusCode.UNAUTHORIZED:
      return Messages.UNAUTHORIZED;
    case StatusCode.RESOURCE_NOT_FOUND:
      return Messages.GENERAL_NETWORK_ERROR;
    case StatusCode.METHOD_NOT_ALLOWED:
      return Messages.NOT_ALLOWED;
    case StatusCode.FORBIDDEN:
    case StatusCode.CONFLICT:
      return Messages.CONFLICT;
    case StatusCode.BAD_REQUEST:
      return Messages.BAD_REQUEST;
    default:
      return Messages.UNEXPECTED;
  }
}

export interface ErrorResponse {
  errorMessage: string;
  errors?: Record<string, string>;
  message?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface HttpError<T = any> extends AxiosError<T> {
  message: string;
  hasFieldErrors: boolean;
  fieldErrors: Record<string, string | undefined>;
}

/**
 *
 * @param error @{AxiosError} to map to @{HttpError}
 * @throws HttpError
 */
export async function formatErrorAndThrow<T>(
  error: AxiosError<ErrorResponse>
): Promise<void> {
  const httpError = error as HttpError<T>;

  let message = "Something went wrong";
  if (typeof error.response?.data?.errorMessage === "string") {
    message = error.response.data.errorMessage;
  } else if (typeof error.response?.data?.message === "string") {
    message = error.response?.data.message;
  }

  // TODO: need to verify from backend and develop form error valid function
  httpError.fieldErrors = error.response?.data?.errors || {};
  httpError.hasFieldErrors = Object.keys(httpError.fieldErrors).length === 0;
  httpError.message = message;
  throw httpError;
}
