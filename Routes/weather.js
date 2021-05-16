const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { TokenValidate } = require("../Routes/verifyToken");
const City = require("../Models/City");
const fetch = require("node-fetch");

router.post("/home", TokenValidate, async (req, res) => {
  const city = new City({
    city: req.body.city,
    userid: req.user._id,
  });

  const cityExist = await City.findOne({
    city: req.body.city,
    userid: req.user._id,
  });
  if (cityExist) return res.status(400).send("City already exists");

  try {
    await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city.city}&units=metric&appid=${process.env.KEY}&lang=fr `,
      {
        method: "GET",
      }
    ).then((response) => {
      if (response.status == 404 || response.status == 400) {
        res.send("Error");
      } else {
        const savedCity = city.save();
        res.send({ city });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/city", TokenValidate, async (req, res) => {
  const city = await City.find({ userid: req.user._id }, { city: 1, _id: 0 });
  let DetailsCity = [];

  //get weather for this city
  Promise.all(
    city.map(async (city) => {
      await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city.city}&units=metric&appid=${process.env.KEY}&lang=fr`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((response) => {
          DetailsCity.push(response);
        })
        .catch((error) => {
          return error.response;
        });
    })
  ).then(() => {
    res.send(DetailsCity);
  });
});

//delete this city
router.post("/delete", TokenValidate, async (req, res) => {
  const cityDelete = await City.findOne({
    city: req.body.city,
    userid: req.user._id,
  });

  try {
    const savedCity = cityDelete.remove();
    res.send(cityDelete);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/details", TokenValidate, async (req, res) => {
  let lat = req.body.coord.lat;
  let lon = req.body.coord.lon;

  let OneCallCity = [];
  //get details for a week for this specific city
  await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${process.env.KEY}&lang=fr`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((response) => {
      OneCallCity.push(response);
    })
    .catch((error) => {
      return error.response;
    });

  res.send(OneCallCity);
});

module.exports = router;
