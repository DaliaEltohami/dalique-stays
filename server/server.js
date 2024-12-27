require("dotenv").config();
const express = require("express");
const runDB = require("./config/db.js");
const bodyParser = require("body-parser");

const roomRouter = require("./routes/roomRoutes");
const usersRouter = require("./routes/usersRoute");
const authRouter = require("./routes/authRoutes");
const bookingRouter = require("./routes/bookingsRoutes");

const app = express();
app.use(express.json());
app.use("/api/rooms", roomRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/bookings", bookingRouter);

runDB();

// Global Error Handler
app.use(async (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log(err.message);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
