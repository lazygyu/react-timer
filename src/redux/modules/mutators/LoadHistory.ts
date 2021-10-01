import { TimerActionTypes, TimerState } from "../timerModel";
import { TimerMutator, TimerPayloadAction } from "./AbstractMutator";
import { Reset } from "./Reset";

type HistoryItem = {
  duration: number;
  totalCount: number;
};

export class LoadHistory extends TimerMutator {
  public interests: TimerActionTypes = TimerActionTypes.LOAD_HISTORY;

  static action(item: HistoryItem): TimerPayloadAction {
    return new LoadHistory(item).action();
  }

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
