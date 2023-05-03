const ErrorResponse = require("../utils/errorResponse");

const errHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.log(error);
  //   Mongoose Duplicate key
  if (err.name == "CastError") {
    const message = `Bootcamp not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  //     Mongoose Validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  //   Mongoose Duplicate key
  if (err.code === 11000) {
    const msg = `Duplicate field value entered`;
    error = new ErrorResponse(msg, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errHandler;
