import { combineReducers, createStore } from 'redux';
import timer, {TimerState} from './modules/timerModel';
import view, { ViewState } from './modules/viewModel';

const reducer = combineReducers({
    timer,
    view,
});

const store = () => createStore(reducer);

export type State = {timer: TimerState, view: ViewState};
export default store();
