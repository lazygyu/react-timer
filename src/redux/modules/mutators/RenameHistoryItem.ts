import { TimerActionTypes, TimerState } from "../timerModel";
import { TimerMutator, TimerPayloadAction } from "./AbstractMutator";

export class RemoveHistoryItem extends TimerMutator {
    public interests: TimerActionTypes = TimerActionTypes.REMOVE_HISTORY_ITEM;

    static action(index: number): TimerPayloadAction {
        return new RemoveHistoryItem(index).action();
    }

    constructor(private index: number) {
        super();
    }

    public apply(state: TimerState): TimerState {
        const {settings, current, history} = state;

        const resultHistory = history.slice();
        resultHistory.splice(this.index, 1);

        return {
            settings,
            current,
            history: resultHistory,
        };
    }
}
