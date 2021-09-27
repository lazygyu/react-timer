import { TimerActionTypes, TimerState } from "../timerModel";

export abstract class AbstractMutator<STATETYPE, ACTIONTYPE> {
    public readonly abstract interests: ACTIONTYPE;

    public abstract apply(state: STATETYPE): STATETYPE;

    public action() {
        return {
            type: this.interests,
            payload: this,
        };
    }
}