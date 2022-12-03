const AppError = require("./../../services/error/error.class");
const errorService = require("./../../services/error/error.service");
module.exports = (err, req, res, next) => {
    const formattedError = errorService(err);

    let response;
    if (formattedError instanceof AppError) {
        response = {
            status: false,
            message: formattedError.message,
        };
    } else {
        response = {
            status: false,
            message: "Something went wrong!",
        };

        // console.error("error", formattedError?.message || formattedError?.body || formattedError?.data?.error || formattedError);
    }

    if (process.env.NODE_ENV === "development") {
        response.stack = formattedError.stack;
    }

    res.status(formattedError.statusCode || 500).json(response);
};
