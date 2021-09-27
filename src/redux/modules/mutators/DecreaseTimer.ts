import { TimerActionTypes, TimerState } from "../timerModel";
import { AbstractMutator } from "./AbstractMutator";
import { NextPhase } from "./NextPhase";

export class DecreaseTimer extends AbstractMutator<TimerState, TimerActionTypes> {
    public interests: TimerActionTypes = TimerActionTypes.SET_REMAIN_TIME;

    private deltaTime: number;

    constructor(deltaTime: number) {
        super();
        this.deltaTime = deltaTime;
    }

    public apply(state: TimerState): TimerState {
       const {settings, current, history} = state; 
       let remainTimer = current.remainTimer - this.deltaTime;
       let count = current.count;
       if (remainTimer < 0) {
            remainTimer = settings.duration;
           if (current.count > 1) {
               count--;
           } else {
               return new NextPhase().apply(state);
           }
       }

       return {
           settings,
           current: {
               ...current,
               count,
               remainTimer,
           },
           history,
       };
    }
}