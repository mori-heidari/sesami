const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
function validateCreate(data) {
    const schema = Joi.object({
        id: Joi.number().required(),
        start: Joi.date().iso().required(),
        end: Joi.date().iso().required(),
    });
    return schema.validate(data);
}
function validateReadById(data) {
    const schema = Joi.object({
        id: Joi.number().required()
    });
    return schema.validate(data);
}
function validateReadByRange(data) {
    const schema = Joi.object({
        start: Joi.date().iso().required(),
        end: Joi.date().iso().required(),
    });
    return schema.validate(data);
}
module.exports.validateCreate=validateCreate
module.exports.validateReadById=validateReadById
module.exports.validateReadByRange=validateReadByRange
