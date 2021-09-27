import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAudio } from "../hooks/useAudio";
import { DecreaseTimer } from "../redux/modules/mutators/DecreaseTimer";
import { TimerPhase, TimerState } from "../redux/modules/timerModel";
import "../scss/timer";
import { CircleGraph } from "./CircleGraphs";
import { Whistle } from "./Whistle";

export function Timer() {
  const dispatch = useDispatch();
  const requestRef = useRef<number>();
  const prevRef = useRef<number | undefined>();

  const { settings, current } = useSelector(
    (state: { timer: TimerState }) => state.timer
  );
  const { totalCount, duration, readyCount } = settings;
  const { remainTimer, phase, count } = current;

  const processFrame = (deltaTime: number) => {
    if (phase === TimerPhase.IDLE) return;
    dispatch(new DecreaseTimer(deltaTime).action());
  };

  const animate = (time: number) => {
    if (prevRef.current !== undefined) {
      const deltaTime = (time - prevRef.current) / 1000;
      processFrame(deltaTime);
    }
    prevRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  });

  let circleLength: number = remainTimer - Math.floor(remainTimer);
  const cntProg = 1 / totalCount;
  let totalLength: number = remainTimer / duration;

  let titleText: string = Math.ceil(remainTimer).toString();

  if (phase === TimerPhase.IDLE) {
    titleText = totalCount > 1 ? totalCount.toString() : duration.toString();
    circleLength = 1;
    totalLength = 1;
  } else if (totalCount > 1 && phase !== TimerPhase.READY) {
    circleLength = remainTimer / duration;
    totalLength = circleLength * cntProg + (count - 1) * cntProg;
    titleText = count.toString();
  } else if (phase === TimerPhase.READY) {
    totalLength = remainTimer / readyCount;
  } 

  return (
    <div className="timer">
      <CircleGraph
        className="small"
        progress={circleLength}
        lineWidth={3}
        color="white"
      />
      <CircleGraph
        className="large"
        progress={totalLength}
        lineWidth={1}
        color="#9cf"
      />
      <div className="center">
        <div className="time">{titleText}</div>
      </div>
      <Whistle />
    </div>
  );
}
