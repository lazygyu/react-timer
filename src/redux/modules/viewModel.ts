import { Action } from "redux";
import { isPayloadAction } from "./PayloadAction";

const initialState = {
    historyOpened: false,
}

export type ViewState = typeof initialState;

export enum ViewActionTypes {
    SET_HISTORY_OPENED = 'set_history_opened',
}

export default function reducer(state: ViewState = initialState, action: Action): ViewState {
    if (Object.values(ViewActionTypes).includes(action.type)) {
        if (isPayloadAction<ViewState, ViewActionTypes>(action)) {
            return action.payload.apply(state);
        }
    }
    return state;
}
