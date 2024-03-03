import React, { useState, useEffect, FunctionComponent } from "react";
import { a, useSpring, to } from "react-spring";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";
import {
  HandleStripContainer,
  LeftContainer,
  LeftHandleBar,
  LeftTimerBar,
  RightContainer,
  RightHandleBar,
  RightTimerBar,
  ScaleBarContainer,
  ScaleBarWrapper,
  StyledHandle,
  TimeLineBorder,
  TimeLineBorderSize,
  TimeLineContainer,
  TimeLineHandleContainer,
  TimeLineImageContainer,
  TimeLineImageWrapper,
} from "./TimeStyle";
import helper from "../../helper/helper";

const HOUR_IN_MS = 3600000;

interface TimelineProps {
  duration: number;
  currentTime: number;
  images: string[];
}

interface HandleProps {
  position: string;
  style?: any;
}

const OUTER_WIDTH = 300;
const HANDLE_WIDTH = 27;
const INNER_WIDTH = OUTER_WIDTH - HANDLE_WIDTH * 2;
const BORDER_WIDTH = 6;

const HandleStrip = () => {
  return <HandleStripContainer />;
};

const Handle: React.FC<HandleProps> = ({ position, ...rest }) => {
  return (
    <StyledHandle handleWidth={HANDLE_WIDTH} position={position} {...rest}>
      <HandleStrip />
    </StyledHandle>
  );
};

const pxToPc = (px: any, max: any) => (px * 100) / max;
const pcToPx = (pc: any, max: any) => (pc * max) / 100;

const pxToPcOuter = (px: any) => pxToPc(px, OUTER_WIDTH);
const pcToPxOuter = (pc: number | string) => pcToPx(pc, OUTER_WIDTH);
const pxToPcInner = (px: any) => pxToPc(px, INNER_WIDTH);
// const pcToPxInner = (pc: any) => pcToPx(pc, INNER_WIDTH);

const Time = ({ time }: { time: number }) => {
  return <span>{helper.formatTime(time * 1000, HOUR_IN_MS)}</span>;
};

const AnimatedTime = a(Time);

const Timeline: FunctionComponent<TimelineProps> = ({
  duration,
  currentTime,
  images,
}) => {
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  useEffect(() => {
    console.log("startTime", startTime);
    console.log("endTime", endTime);
  }, [startTime, endTime]);

  const [{ x, width, fromVisible, toVisible, active }, set] = useSpring(() => ({
    x: 0,
    width: "100%",
    active: false,
    fromVisible: false,
    toVisible: false,
    config: { precision: 0.01 },
    immediate: true,
  }));

  const bindLeft = useDrag(
    ({ movement: [mx], first, memo, down }: any) => {
      if (first) memo = { width: width.get(), x: x.get() };

      const maxX =
        pcToPxOuter(memo.width.slice(0, -1)) + memo.x - 2 * HANDLE_WIDTH;
      const nextX = clamp(mx, 0, maxX);
      const nextWidth =
        memo.width.slice(0, -1) - pxToPcOuter(nextX - memo.x) + "%";
      set({
        x: nextX,
        width: nextWidth,
        active: nextX !== 0 || nextWidth !== "100%",
        fromVisible: down,
        immediate: true,
      });

      if (!down) {
        const newStartTime = (((nextX * 100) / OUTER_WIDTH) * duration) / 100;
        setStartTime(newStartTime);
      }

      return memo;
    },
    { initial: () => [x.get()] }
  );
  const bindRight = useDrag(({ movement: [ox], first, memo, down }: any) => {
    if (first) memo = width.get();
    const maxWidth = pxToPcOuter(OUTER_WIDTH - x.get());
    const minWidth = pxToPcOuter(2 * HANDLE_WIDTH);
    const nextWidth =
      clamp(memo.slice(0, -1) - pxToPcOuter(-ox), minWidth, maxWidth) + "%";

    set({
      width: nextWidth,
      active: x.get() !== 0 || nextWidth !== "100%",
      toVisible: down,
      immediate: true,
    });

    if (!down) {
      const innerXPc = pxToPcInner(x.get());
      const outerWidthPx = pcToPxOuter(nextWidth.slice(0, -1));
      const innerWidthPc = pxToPcInner(outerWidthPx - HANDLE_WIDTH * 2);
      const newEndTime = ((innerWidthPc + innerXPc) * duration) / 100;
      setEndTime(newEndTime);
    }

    return memo;
  });

  const handleStyle = useSpring({
    background: active.to((active: boolean) => (active ? "#ffcd02" : "#222")),
    color: active.to((active: boolean) => (active ? "#000" : "#fff")),
    // Other styles if needed
  });

  return (
    <TimeLineContainer outerWid={OUTER_WIDTH}>
      <TimeLineBorder>
        <TimeLineBorderSize
          borderWidth={BORDER_WIDTH}
          handleWidth={HANDLE_WIDTH}
        >
          <TimeLineImageWrapper>
            <TimeLineImageContainer>
              {images?.map((imageSrc, index) => (
                <img key={index} src={imageSrc} alt={`Frame ${index}`} />
              ))}
              <TimeLineHandleContainer
                borderWidth={BORDER_WIDTH}
                currentTime={currentTime}
                duration={duration}
              />
            </TimeLineImageContainer>
          </TimeLineImageWrapper>
        </TimeLineBorderSize>
        <ScaleBarContainer
          borderWidth={BORDER_WIDTH}
          activated={active}
          style={{
            x,
            width,
            borderColor: active.to((active: any) =>
              active ? "#ffcd02" : "#222"
            ),
          }}
        >
          <ScaleBarWrapper />
          <Handle position="left" {...bindLeft()} style={handleStyle} />
          <Handle position="right" {...bindRight()} style={handleStyle} />

          <LeftHandleBar
            borderWidth={BORDER_WIDTH}
            handleWidth={HANDLE_WIDTH}
            style={{
              display: fromVisible.to((visible) =>
                visible ? "block" : "none"
              ),
            }}
          >
            <LeftContainer>
              <AnimatedTime
                time={x.to((x) => (((x * 100) / INNER_WIDTH) * duration) / 100)}
              />
            </LeftContainer>
            <LeftTimerBar />
          </LeftHandleBar>
          <RightHandleBar
            borderWidth={BORDER_WIDTH}
            handleWidth={HANDLE_WIDTH}
            style={{
              display: toVisible.to((visible) => (visible ? "flex" : "none")),
            }}
          >
            <RightContainer>
              <AnimatedTime
                time={to([x, width], (x: any, width: any) => {
                  const innerXPc = pxToPcInner(x);
                  const outerWidthPx = pcToPxOuter(width.slice(0, -1));
                  const innerWidthPc = pxToPcInner(
                    outerWidthPx - HANDLE_WIDTH * 2
                  );
                  return ((innerWidthPc + innerXPc) * duration) / 100;
                })}
              />
            </RightContainer>
            <RightTimerBar />
          </RightHandleBar>
        </ScaleBarContainer>
      </TimeLineBorder>
    </TimeLineContainer>
  );
};

export default Timeline;
