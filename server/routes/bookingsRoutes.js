const router = require("express").Router();
const {
  roomBooking,
  getBookingsByUserId,
} = require("../controllers/bookingsControllers");

router.post("/roomBooking", roomBooking);

router.post("/getbookingsbyuserid", getBookingsByUserId);

module.exports = router;
