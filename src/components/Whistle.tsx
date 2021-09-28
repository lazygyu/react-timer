import React, { useEffect, useRef } from "react";
import { useStore } from "react-redux";
import { useAudioUnlock } from "../hooks/useAudioUnlock";
import { TimerPhase } from "../redux/modules/timerModel";
import { State } from "../redux/store";

export function Whistle() {
  const [play, load] = useAudioUnlock();

  const state: State = useStore().getState();

  const { remainTimer, phase, count } = state.timer.current;
  const { totalCount, duration } = state.timer.settings;

  const sec = Math.ceil(remainTimer);

  const prevPhase = useRef<TimerPhase | undefined>(undefined);

  load("big", "audio/count_big.mp3");
  load("normal", "audio/count_normal.mp3");

  useEffect(() => {
    if (prevPhase.current !== undefined && phase !== TimerPhase.READY) {
      console.log("case 1");
      play("big");
    }
    prevPhase.current = phase;
  }, [phase]);

  useEffect(() => {
    if (
      ((totalCount === 1 && phase > TimerPhase.IDLE) ||
        phase === TimerPhase.READY) &&
      remainTimer !== duration
    ) {
      console.log("case 2", totalCount, remainTimer, duration);
      play("normal");
    }
  }, [sec]);
  useEffect(() => {
    if (totalCount > 1 && count !== totalCount) {
      console.log("case 3");
      play("normal");
    }
  }, [count]);

  return <></>;
}
