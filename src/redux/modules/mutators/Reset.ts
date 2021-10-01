import { TimerActionTypes, TimerPhase, TimerState } from "../timerModel";
import { TimerMutator, TimerPayloadAction } from "./AbstractMutator";

export class Reset extends TimerMutator {
  public interests: TimerActionTypes = TimerActionTypes.RESET;

  static action(): TimerPayloadAction {
    return new Reset().action();
  }

  public apply(state: TimerState): TimerState {
    const { settings, current, history } = state;
    return {
      settings,
      current: {
        ...current,
        phase: TimerPhase.IDLE,
        count: 1,
        remainTimer: settings.readyCount,
      },
      history,
    };
  }
}
