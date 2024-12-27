const Room = require("../models/roomModel");
const CreateError = require("../utils/appError");
const dayjs = require("dayjs");
const isBetween = require("dayjs/plugin/isBetween");

dayjs.extend(isBetween);

exports.getFilteredRooms = async (req, res, next) => {
  try {
    const { fromDate, toDate } = req.body;

    if (!fromDate || !toDate) {
      return next(
        new CreateError("Both fromDate and toDate are required!", 400)
      );
    }

    // Fetch rooms and populate currentbookings only for filtering
    const rooms = await Room.find().populate({
      path: "currentbookings",
      select: "fromDate toDate", // Fetch only required fields for bookings
    });

    // Filter rooms based on availability
    const filteredRooms = rooms.filter((room) => {
      if (room.currentbookings?.length > 0) {
        const hasConflict = room.currentbookings.some((booking) => {
          return (
            dayjs(fromDate).isBetween(
              booking.fromDate,
              booking.toDate,
              "day",
              "[]"
            ) ||
            dayjs(toDate).isBetween(
              booking.fromDate,
              booking.toDate,
              "day",
              "[]"
            ) ||
            dayjs(booking.fromDate).isBetween(fromDate, toDate, "day", "[]") ||
            dayjs(booking.toDate).isBetween(fromDate, toDate, "day", "[]")
          );
        });
        return !hasConflict; // Exclude room if conflict exists
      }
      return true; // Include room if no bookings
    });

    // Remove currentbookings from the returned filtered rooms
    const sanitizedRooms = filteredRooms.map((room) => {
      const { currentbookings, ...rest } = room.toObject(); // Convert to plain object and exclude currentbookings
      return rest;
    });

    res.status(200).json({
      status: "success",
      data: {
        rooms: filteredRooms,
      },
    });
  } catch (error) {
    console.error(error);
    return next(new CreateError("Error Fetching Rooms!", 500));
  }
};
