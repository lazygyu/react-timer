import { PayloadAction } from "../PayloadAction";
import { TimerActionTypes, TimerPhase, TimerState } from "../timerModel";
import { ViewActionTypes, ViewState } from "../viewModel";

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
export type TimerPayloadAction = PayloadAction<TimerState, TimerActionTypes>;

export abstract class ViewMutator extends AbstractMutator<ViewState, ViewActionTypes> {};
export type ViewPayloadAction = PayloadAction<ViewState, ViewActionTypes>;