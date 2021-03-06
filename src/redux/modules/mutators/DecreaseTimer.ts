import { TimerActionTypes, TimerState } from "../timerModel";
import { TimerMutator, TimerPayloadAction } from "./AbstractMutator";
import { NextPhase } from "./NextPhase";

export class DecreaseTimer extends TimerMutator {
  public interests: TimerActionTypes = TimerActionTypes.SET_REMAIN_TIME;

  private deltaTime: number;

  static action(deltaTime: number) : TimerPayloadAction  {
    return new DecreaseTimer(deltaTime).action();
  }

  constructor(deltaTime: number) {
    super();
    this.deltaTime = deltaTime;
  }

  public apply(state: TimerState): TimerState {
    const { settings, current, history } = state;
    let remainTimer = current.remainTimer - this.deltaTime;
    let count = current.count;
    if (remainTimer < 0) {
      remainTimer = settings.duration;
      if (current.count > 1) {
        count--;
      } else {
        return new NextPhase().apply(state);
      }
    }

    return {
      settings,
      current: {
        ...current,
        count,
        remainTimer,
      },
      history,
    };
  }
}
