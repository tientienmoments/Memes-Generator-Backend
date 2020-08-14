var express = require("express");
var router = express.Router();
const fileUploader = require('../helpers/upload.helper')("public/images/")
const uploader = fileUploader.uploader
const photoHelper = require('../helpers/photo.helper')
const memeController = require('../controllers/memeController')

/**
* @route GET api/memes
* @description Get all memes
* @access Public
*/

router.get("/", memeController.getMemes);

router.get("/images", memeController.getOriginalImages)

router.put("/:id", memeController.updateMeme)

router.post('/',
  uploader.single('image'),
  photoHelper.resize,
  memeController.createMeme)

module.exports = router;