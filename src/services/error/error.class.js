class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = false;

        Error.captureStackTrace(this, this.constructor);
    }
    static notFound(name) {
        return new AppError(`No ${name} found`, 404);
    }

    static serverError() {
        return new AppError("Something went wrong!", 500);
    }
}
module.exports = AppError;
