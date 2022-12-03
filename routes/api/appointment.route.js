const express = require("express");
const router = express.Router();
//const auth=require('./../../src/middlewares/auth')
const {validateReadById,validateReadByRange,validateCreate}=require('./../../src/http/validators/appointment.validator')
const validator=require('./../../src/middlewares/validator')
const controllers = require("./../../src/http/controllers/appointment.controller");
const {roles, resource} = require('./../../src/roles/appointment.role');
const {grantAccess} = require("./../../src/middlewares/grant-access");
router
    .route("/")
    /**
     * @swagger
     * /appointment:
     *   post:
     *     summary: create new appointment
     *     tags:
     *        - appointment
     *     parameters:
     *      - name : body
     *        in : body
     *        description : body for appointment
     *        schema:
     *          type: object
     *          required:
     *            - id
     *            - start
     *            - end
     *          properties:
     *            id :
     *              type: number
     *              example: 1
     *            start :
     *              type: Date
     *              example: 1
     *            end :
     *              type: Date
     *              example: 1
     *     security:
     *        - authorization: []
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                   type: number
     *                   description: plan of payment.
     *                   example: 2
     *               start:
     *                   type: date
     *                   description: start date of appointment
     *                   example: 2
     *               end:
     *                   type: number
     *                   description: end date of appointment
     *                   example: 2
     *     responses:
     *       200:
     *         description:  response info.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status :
     *                   type: boolean
     *                   description: response status.
     *                   example: true
     *                 message :
     *                   type: string
     *                   description: response message.
     *                   example: success
     *                 result :
     *                   type: object
     *                   description: response data
     *
     */
    .post(validator(validateCreate,"body"),controllers.create)
    /**
     * @swagger
     * /appointment:
     *   get:
     *     summary: get all sate in range
     *     parameters:
     *     - in: query
     *       name: start
     *       required: true
     *       schema:
     *       type: string
     *       description: start
     *     - in: query
     *       name: end
     *       required: true
     *       schema:
     *       type: string
     *       description: end
     *     tags:
     *        - appointment
     *     security:
     *        - authorization: []
     *     responses:
     *       200:
     *         description:  response info.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status :
     *                   type: boolean
     *                   description: response status.
     *                   example: true
     *                 message :
     *                   type: string
     *                   description: response message.
     *                   example: success
     *                 result :
     *                   type: object
     *                   description: response data
     *
     */
    .get(validator(validateReadByRange,"query"),controllers.getByRange)


router
    .route("/:id")

    .get(grantAccess(resource, roles),validator(validateReadById(),"params"),controllers.getById)


module.exports = router;
