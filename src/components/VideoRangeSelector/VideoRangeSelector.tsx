import React, { useState, useRef, ChangeEvent } from "react";
import { RangeSlider } from "rsuite";

const VideoRangeSelector: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [sliderValues, setSliderValues] = useState<[number, number]>([0, 0]);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const duration = Math.floor(videoRef.current.duration);
      setVideoDuration(duration);
      setSliderValues([0, duration]);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {videoSrc && (
        <>
          <div className="video-wrapper">
            <video
              ref={videoRef}
              src={videoSrc}
              onLoadedMetadata={handleLoadedMetadata}
              controls
              style={{ width: "100%", aspectRatio: "9 / 16" }}
            />
          </div>
          <RangeSlider
            value={sliderValues}
            min={0}
            max={videoDuration}
            onChange={(values: [number, number]) => setSliderValues(values)}
          />
          <div>
            Start Time: {sliderValues[0]}s, End Time: {sliderValues[1]}s
          </div>
        </>
      )}
    </div>
  );
};

export default VideoRangeSelector;
