const mongoose=require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const appointmentSchema=new mongoose.Schema({
    id:{
        type:Number,
        unique:true,
    },
    start:{
        type:Date,

    },
    end:{
        type:Date,
    },

});
exports.Appointment = mongoose.model('Appointment', appointmentSchema);
