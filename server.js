const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const errHandler = require("./middleware/error");
const connectDB = require("./config/db");

// Route Files
const bootcamps = require("./routes/bootcamps");
dotenv.config({ path: "./config/config.env" });

// Connect to DB
connectDB();

const app = express();
// Body Parser
app.use(express.json());

// dev logging middleware
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootcamps);
app.use(errHandler);

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} made on port ${PORT}`));

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
