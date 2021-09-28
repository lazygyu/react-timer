import { TimerActionTypes, TimerState } from "../timerModel";
import { AbstractMutator } from "./AbstractMutator";
import { Reset } from "./Reset";

type HistoryItem = {
  duration: number;
  totalCount: number;
};

export class LoadHistory extends AbstractMutator<TimerState, TimerActionTypes> {
  public interests: TimerActionTypes = TimerActionTypes.LOAD_HISTORY;

  private item: HistoryItem;
  constructor(item: HistoryItem) {
    super();
    this.item = item;
  }

  public apply(state: TimerState): TimerState {
    const { settings, current, history } = new Reset().apply(state);
    return {
      settings: {
        ...settings,
        totalCount: this.item.totalCount,
        duration: this.item.duration,
      },
      current: {
        ...current,
        count: this.item.totalCount,
        remainTimer: this.item.duration,
      },
      history,
    };
  }
}
