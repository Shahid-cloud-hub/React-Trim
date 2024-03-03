import styled from "styled-components";

export const DisplayVideoContainer = styled("div")`
  display: grid;
  flex: 1;
  place-items: center;
  margin-top: 90px;
`;

export const TimeLineWrapper = styled("div")`
  display: flex;
`;

export const PlayPauseButton = styled("button")`
  cursor: pointer;
  font-size: 1em;
  margin: 0;
  border: none;
  padding: 0;
  height: 50px;
  width: 50px;
  background: #222;
  margin-right: 3px;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TimeLineMain = styled("div")<{ outerWidth: number }>`
  width: ${(props) => props.outerWidth}px;
  height: 50px;
  background: #222;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
`;

export const InnerWrapper = styled("div")`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
`;
