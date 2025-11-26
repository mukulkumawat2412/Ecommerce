import React, { useState } from "react";
import axios from "axios";

function VideoUpload() {
  const [video, setVideo] = useState(null);

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!video) return alert("Select a video first");

    const formData = new FormData();
    formData.append("video", video);

    await axios.post("http://localhost:8000/api/send-video", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Video sent!");
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Send Video</button>
    </div>
  );
}

export default VideoUpload;
