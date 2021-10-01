import { TimerActionTypes, TimerState } from "../timerModel";
import { TimerMutator, TimerPayloadAction } from "./AbstractMutator";
import { Reset } from "./Reset";

export class SetDurationAndCount extends TimerMutator {
  public interests: TimerActionTypes = TimerActionTypes.SET_DURATION_AND_COUNT;

  static action(duration: number, totalCount: number): TimerPayloadAction {
    return new SetDurationAndCount(duration, totalCount).action();
  }

  constructor(private duration: number, private totalCount: number) {
    super();
  }

  public apply(state: TimerState): TimerState {
    const { current, history, settings } = new Reset().apply(state);
    return {
      current,
      history,
      settings: {
        ...settings,
        duration: this.duration,
        totalCount: this.totalCount,
      },
    };
  }
}
