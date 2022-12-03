const express = require("express");
const router = express.Router();

const appointmentRoutes = require("./appointment.route");

router.use("/appointment",appointmentRoutes );

module.exports = router;
