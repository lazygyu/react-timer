import { TimerActionTypes, TimerState } from "../timerModel";
import { TimerMutator } from "./AbstractMutator";

export class RemoveHistoryItem extends TimerMutator {
    public interests: TimerActionTypes = TimerActionTypes.REMOVE_HISTORY_ITEM;

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
