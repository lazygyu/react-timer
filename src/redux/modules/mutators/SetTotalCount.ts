import { TimerActionTypes, TimerState } from "../timerModel";
import { TimerMutator, TimerPayloadAction } from "./AbstractMutator";
import { Reset } from "./Reset";

export class SetTotalCount extends TimerMutator {
  public interests: TimerActionTypes = TimerActionTypes.SET_TOTAL_COUNT;

  private totalCount: number;

  static action(totalCount: number): TimerPayloadAction {
    return new SetTotalCount(totalCount).action();
  }

  constructor(totalCount: number) {
    super();
    this.totalCount = totalCount;
  }

  public apply(state: TimerState): TimerState {
    const { settings, current, history } = new Reset().apply(state);
    return {
      current: {
        ...current,
      },
      settings: {
        ...settings,
        totalCount: this.totalCount,
      },
      history,
    };
  }
}
