const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });
const app = express();
const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} made on port ${PORT}`));
