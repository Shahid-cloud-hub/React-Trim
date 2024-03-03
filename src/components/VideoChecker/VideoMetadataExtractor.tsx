import React, { useState } from "react";

// Define a type for the video details state
type VideoDetails = {
  startTime: number;
  endTime: number;
  width: number;
  height: number;
};

const VideoMetadataExtractor: React.FC = () => {
  const [videoDetails, setVideoDetails] = useState<VideoDetails>({
    startTime: 0,
    endTime: 0,
    width: 0,
    height: 0,
  });

  // Update the event handler to use TypeScript's type for the event
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const videoElement = document.createElement("video");
    videoElement.src = URL.createObjectURL(file);

    videoElement.addEventListener("loadedmetadata", () => {
      setVideoDetails({
        startTime: 0,
        endTime: videoElement.duration,
        width: videoElement.videoWidth,
        height: videoElement.videoHeight,
      });
    });
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      <div>
        <p>Start Time: {videoDetails.startTime}s</p>
        <p>End Time: {videoDetails.endTime}s</p>
        <p>Width: {videoDetails.width}px</p>
        <p>Height: {videoDetails.height}px</p>
      </div>
    </div>
  );
};

export default VideoMetadataExtractor;
