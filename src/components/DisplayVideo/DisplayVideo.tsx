import React, { useState, useEffect } from "react";
import {
  DisplayVideoContainer,
  InnerWrapper,
  PlayPauseButton,
  TimeLineMain,
  TimeLineWrapper,
} from "./DisplayStyle";
import VideoFrameExtractor from "../VideoFrameExtractor/VideoFrameExtractor";
import playIcon from "../../play.svg";
import pauseIcon from "../../pause.svg";
import Timeline from "../Timeline/Timeline";

interface VideoData {
  dur: number;
  fra: string[];
}

const OUTER_WIDTH = 300;

const DisplayVideo = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [data, setData] = useState<{ videoData: VideoData }>({
    videoData: { dur: 0, fra: [] },
  });

  const { dur = 0, fra = [] } = data?.videoData || {};

  useEffect(() => {
    let intervalId: any;
    if (playing) {
      intervalId = setInterval(() => {
        setCurrentTime((prev) => (prev >= dur * 1000 ? 0 : prev + 100));
      }, 100);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [playing, dur]);

  const handleVideoUrl = (videoData: any) => {
    setData({ videoData });
    console.log("videoData", videoData);
    console.log("data", data);
  };

  return (
    <DisplayVideoContainer>
      <h1>DisplayVideo</h1>
      <VideoFrameExtractor handleVideoUrl={handleVideoUrl} />
      <TimeLineWrapper>
        <PlayPauseButton onClick={() => setPlaying(!playing)}>
          <img
            src={playing ? pauseIcon : playIcon}
            width={15}
            alt="toggle playback icon"
          />
        </PlayPauseButton>
        <TimeLineMain outerWidth={OUTER_WIDTH}>
          <InnerWrapper>
            <Timeline duration={dur} currentTime={currentTime} images={fra} />
          </InnerWrapper>
        </TimeLineMain>
      </TimeLineWrapper>
    </DisplayVideoContainer>
  );
};

export default DisplayVideo;
