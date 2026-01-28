export const getErrorMessageType = (error: unknown): string => {
    return error instanceof Error ? error.message : String(error);
};