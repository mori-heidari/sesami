const config = require('config');
const AppError = require('./../error/error.class')
const {Appointment, AppointmentState} = require("./../../models/appointment.model");
const create = async (id, start, end) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkDate = await Appointment.findOne({
                $and: [
                    {
                        $or: [
                            {$and: [{start: {$lte: start}}, {end: {$gte: start}}]},
                            {$and: [{start: {$lte: end}}, {end: {$gte: end}}]},
                        ]
                    },
                    {id: {$ne: id}}
                ]
            });
            if (checkDate) throw new AppError("this time range is reserved!");
            await AppointmentState.create({
                id: id,
                start: start,
                end: end,

            });
            const appointment = await Appointment.update({
                id: id,
            }, {
                start: start,
                end: end,

            }, {upsert: true, setDefaultsOnInsert: true});
            //appointment.historical_data.push({start,end});
            //await appointment.save();
            resolve(appointment);
        } catch (error) {
            return reject(error);
        }
    });

};
const getByRange = async (start, end) => {
    return new Promise(async (resolve, reject) => {
        try {
            const appointment = await Appointment.find({
                start: {$gte: start},
                end: {$lte: end},
            });
            resolve(appointment);
        } catch (error) {
            return reject(error);
        }
    });

};
module.exports = {
    create,
    getByRange
}

