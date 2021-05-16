const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./Routes/auth");
const weatherRoute = require("./Routes/weather");
const cors = require("cors");
const corsOptions = { origin: "http://localhost:3000" };
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // limit each IP to 100 requests
});

dotenv.config();

app.use(helmet());

//connection with DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () =>
  console.log("> DB is now connected")
);

app.use(cors({ credentials: true, corsOptions }));

app.use(express.json());

app.use("/api/user", authRoute, limiter);

app.use("/api/weather", weatherRoute, limiter);

//launch server on port 3001
app.listen(3001, () => console.log("> The server is now running on port 3001"));
