const VideoDetail = require("../model/videoDetails");

module.exports.videosDetailsAdd = async (req, res, next) => {
  console.log(req.body);
  const videoName = req.file.filename;
  const subtitle = req.body.subtitle;
  const timestamp = req.body.timestamp;
  const title = req.body.title;

  console.log(req.file);
  try {
    await VideoDetail.create({
      video: videoName,
      text: subtitle,
      timestamp: timestamp,
      title: title,
    });
    res.json({ status: "ok" });
  } catch (err) {
    next(err);
  }
};
module.exports.getVideo = async (req, res, next) => {
  try {
    await VideoDetail.find({}).then((data) =>
      res.send({ status: "ok", data: data })
    );
  } catch (err) {
    next(err);
  }
};
