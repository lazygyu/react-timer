import { TimerActionTypes, TimerState } from "../timerModel";
import { AbstractMutator } from "./AbstractMutator";
import { Reset } from "./Reset";

export class SetTotalCount extends AbstractMutator<
  TimerState,
  TimerActionTypes
> {
  public interests: TimerActionTypes = TimerActionTypes.SET_TOTAL_COUNT;

  private totalCount: number;

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
