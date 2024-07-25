const mongoose = require("mongoose");
const User = require("../models/rest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function post(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("Required fields can't be empty");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      email: email,
      password: hashedPassword
    });
    await user.save();

    res.status(200).send({ createdUser: user });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
}

async function getAll(req, res) {
  try {
    const user = await User.find();
    res.status(200).send({ user });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Required fields can't be empty");
    }

    let user = await User.findOne({ email });
    if(!user) {
      return res.status(404).send("Email doesn't exist");
    }

    const result = await bcrypt.compare(password, user.password);
    if(!result) {
      return res.status(401).send("Password is incorrecct");
      
    }

    user = user.toJSON();
    delete user.password;
    const token = jwt.sign({
      user: user
    }, "first-token")

    res.status(200).send({
      token, user
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Something went wrong!");
  }
}
async function getSingle(req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).send({ user });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
}

async function update(req, res) {
  try {
    const { name } = req.body;
    const { userId } = req.params;

    if (!name) {
      return res.status(400).send("Name is required");
    }
    const updateduser = await User.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          name: name,
        },
      }
    );
    res.status(200).send({ "updateduser":updateduser });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
}

async function deleteuser(req, res) {
  try {
    const { userId } = req.params;
    await User.deleteOne({
      _id: userId,
    });
    res.status(200).send("user deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
}



module.exports = {
  post,
  getAll,
  login,
  getSingle,
  update,
  deleteuser,


};