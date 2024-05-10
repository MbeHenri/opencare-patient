const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Patient = require("./models/Patient");
const { port, FRONTEND, dbURI, key_token } = require("./config");

const app = express();
const PORT = port;
app.use(
  cors({
    origin: [FRONTEND],
    credentials: true,
  })
);

// use bodyParser middleware to receive form data
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);

// connects to mongoDB database
// second parameter removes deprecation errors

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    // only listen for requests once database data has loaded
    app.listen(PORT, () => console.log(`Server has started at port ${PORT}`));
  })
  .catch((err) => console.log(err));

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  Patient.findOne({ username }).then((patient) => {
    if (!patient) {
      return res.json({
        message: "Nom utilisateur ou mot de passe inccorect",
        code: 400,
      });
    }
    bcrypt.compare(password, patient.password, (err, result) => {
      if (result) {
        const payload = {
          uuid: patient.uuid,
          username: patient.username,
        };
        jwt.sign(
          payload,
          key_token,
          {
            expiresIn: "1hr",
          },
          (err, token) => {
            if (err) return res.json({ message: err });
            return res.json({
              message: "Success",
              patient: patient,
              token: "Bearer " + token,
              code: 201,
            });
          }
        );
      } else {
        return res.json({ message: "Invalid Username or Password", code: 400 });
      }
    });
  });
});

app.get("/protected", verifyJWT, (req, res) => {
  res.json({
    isLoggedIn: true,
    username: req.user,
    uuid: req.user.uuid,
  });
});

function verifyJWT(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token) {
    jwt.verify(token, "opencare-token", (err, decoded) => {
      if (err)
        return res.json({
          isLoggedIn: false,
          message: "Failed to Authenticate",
        });
      req.user = {};
      req.user.uuid = decoded.uuid;
      req.user.username = decoded.username;
      next();
    });
  } else {
    res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
}