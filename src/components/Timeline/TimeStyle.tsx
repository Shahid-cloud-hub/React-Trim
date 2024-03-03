import styled from "styled-components";
import { animated } from "react-spring";

interface TimeLineContainerProps {
  outerWid: number;
}

interface TimeLineBorderSizeProps {
  borderWidth: number;
  handleWidth: number;
}
interface StyledHandleSizeProps {
  position: string;
  handleWidth: number;
}

interface TimeLineHandleContainerProps {
  borderWidth: number;
  currentTime: number;
  duration: number;
}

interface StyledDivProps {
  activated: any; // or any other type you expect
  borderWidth: number;
}

interface LeftHandleBarProps {
  borderWidth: number;
  handleWidth: number;
}

interface RightHandleBarProps {
  borderWidth: number;
  handleWidth: number;
}

export const TimeLineContainer = styled("div")<TimeLineContainerProps>`
  width: ${(props) => `${props.outerWid}px`};
  height: 100%;
  touch-action: none;
  user-select: none;
  -webkit-touch-callout: none;
`;

export const TimeLineBorder = styled("div")`
  position: relative;
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
`;

export const TimeLineBorderSize = styled("div")<TimeLineBorderSizeProps>`
  width: 100%;
  height: 100%;
  padding: ${(props) => props.borderWidth}px ${(props) => props.handleWidth}px;
`;

export const TimeLineImageWrapper = styled("div")`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const TimeLineImageContainer = styled("div")`
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  align-items: center;
  height: 100%;

  img {
    max-height: 100px;
    width: auto;
    height: auto;
  }
`;

export const TimeLineHandleContainer = styled(
  "div"
)<TimeLineHandleContainerProps>`
  width: 5px;
  height: calc(100% + ${(props) => props.borderWidth / 2}px);
  background: white;
  position: absolute;
  top: ${(props) => -props.borderWidth / 4}px;
  left: ${(props) => (props.currentTime / 1000) * (100 / props.duration)}%;
  border-radius: 50px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const HandleStripContainer = styled("div")`
  height: 20px;
  border-radius: 32px;
  width: 3px;
  background: currentColor;
`;

export const StyledHandle = styled(animated.div)<StyledHandleSizeProps>`
  position: absolute;
  top: 0;
  ${(props) => props.position}: 0;
  height: 100%;
  width: ${(props) => props.handleWidth}px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: w-resize;
  background: #ffcd02;
`;

export const ScaleBarContainer = styled(animated.div)<StyledDivProps>`
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  border-top: ${(props) => props.borderWidth}px solid;
  border-bottom: ${(props) => props.borderWidth}px solid
    ${(props) => (props.activated ? "#ffcd02" : "#222")};
  position: absolute;
`;

export const ScaleBarWrapper = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const LeftHandleBar = styled(animated.div)<LeftHandleBarProps>`
  position: absolute;
  bottom: calc(100% + ${(props) => props.borderWidth + 8}px);
  left: ${(props) => props.handleWidth}px;
  color: #000;
`;

export const LeftContainer = styled("div")`
  transform: translateX(calc(-50% + 1px));
`;

export const LeftTimerBar = styled("div")`
  width: 1px;
  height: 2rem;
  background: #000;
`;

export const RightHandleBar = styled(animated.div)<RightHandleBarProps>`
  position: absolute;
  bottom: calc(100% + ${(props) => props.borderWidth + 8}px);
  right: ${(props) => props.handleWidth}px;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const RightContainer = styled("div")`
  transform: translateX(calc(-50% + 1px));
`;

export const RightTimerBar = styled("div")`
  width: 1px;
  height: 2rem;
  background: #000;
`;
