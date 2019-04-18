const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require("./auth.js");
const users = require("./users.js");
const User = users.model;

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../public/images/',
  limits: {
    fileSize: 10000000
  }
});

const scrapbookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  title: String,
  type: String,
});

const Scrapbook = mongoose.model('Scrapbook', scrapbookSchema);

router.get("/", auth.verifyToken, User.verify, async (req, res) => {
  try {
    let scrapbooks = await Scrapbook.find({
      user: req.user
    });
    return res.send(scrapbooks);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/", auth.verifyToken, User.verify, async (req, res) => {
  console.log(req.body);
  const scrapbook = new Scrapbook({
    user: req.user,
    title: req.body.title,
    type: req.body.type,
  });
  try {
    await scrapbook.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Scrapbook,
  routes: router,
}