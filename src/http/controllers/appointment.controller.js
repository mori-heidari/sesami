const asyncCatch = require("./../../utils/catch-async");
const { create, getByRange,getById } = require("../../services/appointment/appointment.service");
exports.create = asyncCatch(async (req, res, err) => {
    const {id,start,end}=req.body;
    //const {user_id}=req;
    const result = await create(id,start,end);
    return res.status(200).json({
        status: true,
        message: "success",
        result: result,
    });
});
exports.getById = asyncCatch(async (req, res, err) => {
    const {id}=req.body;
    //const {user_id}=req;
    const result = await getById(id);
    return res.status(200).json({
        status: true,
        message: "success",
        result: result,
    });
});
exports.getByRange = asyncCatch(async (req, res, err) => {
    const {start,end}=req.query;
    //const {user_id}=req;
    const result = await getByRange(start,end);
    return res.status(200).json({
        status: true,
        message: "success",
        result: result,
    });
});


