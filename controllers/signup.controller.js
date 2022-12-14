const { Router } = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcryptjs");

const signupController = Router();

signupController.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 8, async function (err, hash) {
    if (err) {
      res.send({ message: "Something went wrong please try again" });
    }

    try {
      const userData = new UserModel({
        name,
        email,
        password: hash,
      });
      await userData.save();
      console.log(userData);
      res.status(201).send({ message: "signup sucessful" });
    } catch (error) {
      res.send({ message: "Something went wrong please try again" });
    }
  });
});

module.exports = {
  signupController,
};
