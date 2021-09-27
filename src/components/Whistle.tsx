import React, { useEffect, useRef } from "react";
import { useStore } from "react-redux";
import { useAudio } from "../hooks/useAudio";
import { TimerPhase, TimerState } from "../redux/modules/timerModel";

export function Whistle() {
    const [playBig, stopBig] = useAudio('/audio/count_big.mp3');
    const [playNormal, stopNormal] = useAudio('/audio/count_normal.mp3');

    const state : {timer: TimerState} = useStore().getState();

    const {remainTimer, phase, count} = state.timer.current;
    const {totalCount, duration} = state.timer.settings;

    const sec = Math.ceil(remainTimer);

    const prevPhase = useRef<TimerPhase | undefined>(undefined);

    useEffect(() => {
        if (prevPhase.current !== undefined && phase !== TimerPhase.READY) {
            playBig();
        }
        prevPhase.current = phase;
    }, [phase]);

    useEffect(() => {
        if ((totalCount === 1 || phase === TimerPhase.READY) && remainTimer !== duration) {
            playNormal();
        }
    }, [sec]);
    useEffect(() => {
        if (totalCount > 1 && count !== totalCount) {
            playNormal();
        }
    }, [count]);


    return <></>;
}