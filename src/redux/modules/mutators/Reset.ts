import { TimerActionTypes, TimerPhase, TimerState } from "../timerModel";
import { AbstractMutator } from "./AbstractMutator";

export class Reset extends AbstractMutator<TimerState, TimerActionTypes> {
    public interests: TimerActionTypes = TimerActionTypes.RESET;

    public apply(state: TimerState): TimerState {
        const {settings, current, history} = state;
        return {
            settings,
            current: {
                ...current,
                phase: TimerPhase.IDLE,
                count: 1,
                remainTimer: settings.readyCount,
            },
            history,
        };
    }
}