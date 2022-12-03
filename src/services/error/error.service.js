const AppError = require("./error.class");
const handleDuplicateFieldsDB = (err) => {
    const value = err.keyValue[Object.keys(err.keyValue)[0]];
    const message = `Duplicate field value: ${value}. Please use a different value!`;
    return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
    const message = `Invalid input data.`;
    return new AppError(message, 400);
};
const handleJWTError = () => {
    const message = "Token is not valid!";
    return new AppError(message, 401);
};
const handleJWTExpiredError = () => {
    const message = "Your token has expired. Please log in again!";
    return new AppError(message, 401);
};
module.exports = (error) => {
    let formattedError;

    if (error.code === 11000) {
        formattedError = handleDuplicateFieldsDB(error);
    }
    if (error.name === "invalid_password") {
        formattedError = handleValidationErrorDB(error);
    }
    if (error.name === "ValidationError") {
        formattedError = handleValidationErrorDB(error);
    }
    if (error.name === "JsonWebTokenError") {
        formattedError = handleJWTError();
    }
    if (error.name === "TokenExpiredError") {
        formattedError = handleJWTExpiredError();
    }
    console.log(error)

    return formattedError || error;
};
