const validatorDebug=require('debug')('app:validator');
const AppError=require('./../services/error/error.class')
const validate = (validator,type) => {
    return (req, res, next) => {
        const { error } = validator(req[type])
        const valid = error == null;
        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            validatorDebug("error", message)
            next(new AppError(message,422))
        }
    }
}
module.exports = validate;
