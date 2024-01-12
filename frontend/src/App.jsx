import React, { useState, useEffect, useRef } from "react";
// import axios from "../../backend/uploads";
import axios from "axios";

const App = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [allVideos, setAllvideos] = useState(null);
  const [subtitleText, setSubtitleText] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [title, setTitle] = useState("");
  const inputRef = useRef();

  // vtt implementation

  const [vttUrl, setVttUrl] = useState("");

  useEffect(() => {
    const convertVideoToVTT = async (videoPath) => {
      const videoElement = document.createElement("video");
      videoElement.src = videoPath;

      videoElement.addEventListener("loadeddata", () => {
        const duration = Math.floor(videoElement.duration);
        const cueData = [];

        for (let i = 0; i < duration; i++) {
          const startTime = i;
          const endTime = i + 1;

          const cueText = `${startTime}:${endTime}\n\n`;
          const cue = new VTTCue(startTime, endTime, cueText);
          cueData.push(cue);
        }

        const vttBlob = new Blob([cueData.map((cue) => cue.text).join("")], {
          type: "text/vtt",
        });
        const vttUrl = URL.createObjectURL(vttBlob);
        setVttUrl(vttUrl);

        // Uncomment the following lines if you want to download the VTT file
        // const a = document.createElement('a');
        // a.href = vttUrl;
        // a.download = 'output.vtt';
        // a.click();
      });
    };

    // Example usage
    allVideos == null
      ? ""
      : allVideos.map((data) => {
          const videoPath = `http://localhost:8080/uploads/${data.video}`;
          convertVideoToVTT(videoPath);
        });
  }, []);

  useEffect(() => {
    getVideo();
  }, []);

  const videoTimeStamp = () => {
    allVideos.map((data) => {
      const input = data.timestamp.split(":");
      const exactTime =
        Number(input[0]) * 60 + Number(input[1]) * 60 + Number(input[2]) * 1;
      inputRef.current.currentTime = exactTime;
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("subtitle", subtitleText);
    formData.append("title", title);
    formData.append("timestamp", timestamp);

    const result = await axios.post(
      "http://localhost:8080/api/video/",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  };
  const getVideo = async () => {
    const result = await axios.get("http://localhost:8080/api/video/");
    console.log(result);
    setAllvideos(result.data.data);
  };

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setVideoFile(e.target.files[0]);
  };

  return (
    <div>
      <h1 className="heading">Video Uploader</h1>
      <form className="formData" onSubmit={submitHandler}>
        <input type="file" accept="video/*" onChange={onInputChange} />
        <input
          type="text"
          value={title}
          placeholder="Video Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={subtitleText}
          placeholder="Description Text"
          onChange={(e) => setSubtitleText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Timestamp (e.g., 00:01:23)"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      {allVideos == null
        ? ""
        : allVideos.map((data) => {
            return (
              <div className="videoData">
                <div className="data1">
                  <h1 className="heading">{data.title}</h1>
                  <video
                    ref={inputRef}
                    key={data._id}
                    src={`http://localhost:8080/uploads/${data.video}`}
                    width="750"
                    height="500"
                    controls
                  >
                    {vttUrl && (
                      <track
                        label="English"
                        kind="subtitles"
                        src={vttUrl}
                        srcLang="en"
                        default
                      />
                    )}
                  </video>
                </div>
                <div className="data2">
                  <h3>Subtitle : {data.text}</h3>
                  <span onClick={videoTimeStamp}>
                    TimeStamp : {data.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default App;
