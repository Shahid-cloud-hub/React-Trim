import React, { useRef, useState, FunctionComponent } from "react";

interface VideoFrameExtractorProps {
  handleVideoUrl: (data: {
    dur: number;
    fra: string[];
    time: number;
    videoUrl: string;
  }) => void;
}

const VideoFrameExtractor: FunctionComponent<VideoFrameExtractorProps> = ({
  handleVideoUrl,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [vidUrl, setVidUrl] = useState<string>("");

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const url = URL.createObjectURL(file);
      setVidUrl(url);
      if (videoRef.current) {
        videoRef.current.src = url;
        videoRef.current.load();
      }
    }
  };

  const onMetadataLoaded = () => {
    setIsLoading(false);
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;
      const frameRate = 1;
      captureFrame(video.currentTime, frameRate, video.duration, []);
    }
  };

  const captureFrame = (
    currentTime: number,
    frameRate: number,
    duration: number,
    frames: string[]
  ) => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context && currentTime <= duration) {
        video.currentTime = currentTime;
        const scale = 0.5;
        canvas.width = video.videoWidth * scale;
        canvas.height = video.videoHeight * scale;
        video.onseeked = () => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          frames.push(canvas.toDataURL("image/jpeg", 0.65));
          requestAnimationFrame(() => {
            captureFrame(currentTime + frameRate, frameRate, duration, frames);
          });
        };
      } else if (context) {
        const roundedDuration = Math.round(video.duration - 1);
        console.log("video.duration", roundedDuration);
        console.log("video.currentTime", video.currentTime);
        handleVideoUrl({
          dur: roundedDuration,
          fra: frames,
          time: video.currentTime,
          videoUrl: vidUrl,
        });
        setImages(frames);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      {isLoading && <div>Loading video metadata, please wait...</div>}
      <video
        ref={videoRef}
        style={{ display: "none" }}
        onLoadedMetadata={onMetadataLoaded}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default VideoFrameExtractor;
