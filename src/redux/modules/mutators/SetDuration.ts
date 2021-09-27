import { TimerActionTypes, TimerPhase, TimerState } from "../timerModel";
import { AbstractMutator } from "./AbstractMutator";
import { Reset } from "./Reset";

export class SetDuration extends AbstractMutator<TimerState, TimerActionTypes> {
    public interests: TimerActionTypes = TimerActionTypes.SET_DURATION;

    private duration: number;

    constructor(duration: number) {
        super();
        this.duration = duration;
    }

    public apply(state: TimerState): TimerState {
        const {settings, current, history} = new Reset().apply(state);
        return {
            settings: {
                ...settings,
                duration: this.duration,
            },
            current: {
                ...current,
                phase: TimerPhase.IDLE,
                count: 1,
                remainTimer: this.duration,
            },
            history
        };
    }
}