import { TimerActionTypes, TimerState } from "../timerModel";

export abstract class AbstractMutator<STATETYPE, ACTIONTYPE> {
  public abstract readonly interests: ACTIONTYPE;

  public abstract apply(state: STATETYPE): STATETYPE;

  public action() {
    return {
      type: this.interests,
      payload: this,
    };
  }
}

export abstract class TimerMutator extends AbstractMutator<TimerState, TimerActionTypes> {};
