import { Action } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { isPayloadAction } from "./PayloadAction";

export type TimerState = {
    settings: {
        totalCount: number,
        duration: number,
        readyCount: number,
    },
    current: {
        count: number,
        remainTimer: number,
        phase: TimerPhase,
    },
    history: {totalCount: number, duration: number}[]
};

export enum TimerPhase {
    IDLE,
    READY,
    PLAY,
};

const initialState: TimerState = {
    settings: {
        totalCount: 1,
        duration: 10,
        readyCount: 3,
    },
    current: {
        count: 1,
        remainTimer: 10,
        phase: TimerPhase.IDLE,
    },
    history: [],
};

export enum TimerActionTypes {
    SET_STARTED = 'set_started',
    SET_DURATION = 'set_duration',
    SET_COUNT = 'set_count',
    SET_TOTAL_COUNT = 'set_total_count',
    SET_REMAIN_TIME = 'set_remain_time',
    LOAD_HISTORY = 'load_history',
    NEXT_PHASE = 'next_phase',
    SET_DURATION_AND_COUNT = 'set_duration_count',
    RESET = 'reset',
}

function reducer(state: TimerState = initialState, action: Action): TimerState {
    if (Object.values(TimerActionTypes).includes(action.type)) {
        if (isPayloadAction<TimerState, TimerActionTypes>(action)) {
            return action.payload.apply(state);
        }
    }
    return state;
}

const persistConfig = {
    key: 'rootTimer',
    storage,
    whitelist: ['settings', 'history'],
}

export default persistReducer(persistConfig, reducer);