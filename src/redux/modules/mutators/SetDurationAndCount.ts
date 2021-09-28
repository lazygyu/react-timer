import { TimerActionTypes, TimerState } from "../timerModel";
import { AbstractMutator } from "./AbstractMutator";
import { Reset } from "./Reset";

export class SetDurationAndCount extends AbstractMutator<
  TimerState,
  TimerActionTypes
> {
  public interests: TimerActionTypes = TimerActionTypes.SET_DURATION_AND_COUNT;

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
