import { TimerActionTypes, TimerPhase, TimerState } from "../timerModel";
import { AbstractMutator } from "./AbstractMutator";

export class NextPhase extends AbstractMutator<TimerState, TimerActionTypes> {
  public interests: TimerActionTypes = TimerActionTypes.NEXT_PHASE;

  private state: TimerState;

  public apply(state: TimerState): TimerState {
    this.state = state;
    switch (state.current.phase) {
      case TimerPhase.IDLE:
        return this.toReady();
      case TimerPhase.READY:
        return this.toPlay();
      case TimerPhase.PLAY:
        return this.toIdle();
    }
  }

  private toReady(): TimerState {
    console.log("to ready");
    const { settings, current, history: oldHistory } = this.state;
    let history = oldHistory.slice();
    const cur = {
      duration: settings.duration,
      totalCount: settings.totalCount,
    };
    if (
      history.length > 0 &&
      history.some(
        (tar) =>
          tar.duration === cur.duration && tar.totalCount === cur.totalCount
      )
    ) {
      // do nothing
    } else {
      history.push(cur);
      if (history.length > 10) {
        history = history.slice(-10);
      }
    }

    return {
      settings,
      current: {
        ...current,
        phase: TimerPhase.READY,
        count: 1,
        remainTimer: settings.readyCount,
      },
      history,
    };
  }

  private toPlay(): TimerState {
    const { settings, current, history } = this.state;
    return {
      settings,
      current: {
        ...current,
        phase: TimerPhase.PLAY,
        count: settings.totalCount,
        remainTimer: settings.duration,
      },
      history,
    };
  }

  private toIdle(): TimerState {
    const { settings, current, history } = this.state;
    return {
      settings,
      current: {
        ...current,
        phase: TimerPhase.IDLE,
        count: 1,
        remainTimer: settings.duration,
      },
      history,
    };
  }
}
