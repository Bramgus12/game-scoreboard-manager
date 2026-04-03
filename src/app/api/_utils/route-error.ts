type LogApiErrorInput = {
    route: string;
    operation: string;
    error: unknown;
    request?: Request;
    metadata?: Record<string, unknown>;
};

function toError(error: unknown): Error {
    if (error instanceof Error) {
        return error;
    }

    return new Error(typeof error === "string" ? error : "Unknown error");
}

export function logApiError(input: LogApiErrorInput) {
    const { route, operation, error, request, metadata } = input;
    const resolvedError = toError(error);

    console.error("[API_ERROR]", {
        route,
        operation,
        method: request?.method,
        url: request?.url,
        message: resolvedError.message,
        stack: resolvedError.stack,
        metadata,
    });
}
