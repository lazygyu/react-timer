import { TimerActionTypes, TimerPhase, TimerState } from "../timerModel";
import { TimerMutator, TimerPayloadAction } from "./AbstractMutator";
import { Reset } from "./Reset";

export class SetDuration extends TimerMutator {
  public interests: TimerActionTypes = TimerActionTypes.SET_DURATION;

  private duration: number;

  static action(duration: number): TimerPayloadAction {
    return new SetDuration(duration).action();
  }

  constructor(duration: number) {
    super();
    this.duration = duration;
  }

  public apply(state: TimerState): TimerState {
    const { settings, current, history } = new Reset().apply(state);
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
      history,
    };
  }
}
