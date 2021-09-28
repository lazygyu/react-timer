import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NextPhase } from "../redux/modules/mutators/NextPhase";
import { Reset } from "../redux/modules/mutators/Reset";
import { TimerPhase } from "../redux/modules/timerModel";
import { State } from "../redux/store";
import "../scss/ToggleButton";

export function ToggleButton() {
  const dispatch = useDispatch();
  const phase = useSelector(
    (state: State) => state.timer.current.phase
  );

  const start = () => {
    dispatch(new NextPhase().action());
  };

  const btnStart = (
    <button className="toggleButton btnStart" onClick={start}>
      Touch to Start
    </button>
  );

  const stop = () => {
    dispatch(new Reset().action());
  };

  const btnStop = (
    <button className="toggleButton btnStop" onClick={stop}>
      Stop
    </button>
  );

  return <>{phase === TimerPhase.IDLE ? btnStart : btnStop}</>;
}
