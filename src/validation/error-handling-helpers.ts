export const customErrorInQueryMessage = (message: string, field?: string) => ({
    message,
    field // Optional: express-validator usually knows the field, but you can override it
});