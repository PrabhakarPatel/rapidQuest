const express = require("express");

const {
  videosDetailsAdd,
  getVideo,
} = require("../controllers/VideoController.js");

const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/video", upload.single("video"), videosDetailsAdd);
router.get("/video", getVideo);

module.exports = router;
