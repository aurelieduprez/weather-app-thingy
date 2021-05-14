const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./Routes/auth');
const weatherRoute = require('./Routes/weather');
const cors = require('cors')
const corsOptions = { origin: "http://localhost:3000" };
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });

dotenv.config();

app.use(helmet());

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => console.log('Connected to DB'));

app.use(cors({credentials :true,corsOptions}));

app.use(express.json());

app.use('/api/user', authRoute, limiter);

app.use('/api/weather', weatherRoute, limiter);

app.listen(3001, () => console.log("Server up ! GLHF !"));

