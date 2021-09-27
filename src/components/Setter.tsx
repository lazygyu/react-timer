import React, { ChangeEvent, ChangeEventHandler, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetHistoryOpened } from "../redux/modules/mutators/SetHistoryOpen";
import { RootState, State } from "../redux/store";
import "../scss/setter.scss";
import { CountSetter } from "./CountSetter";

export function Setter() {
  const dispatch = useDispatch();
  const opened = useSelector((state: State) => state.view.historyOpened);
  const toggleHistory = () => {
    dispatch(new SetHistoryOpened(!opened).action());
  }

  return (
    <div className="setter">
      <CountSetter />
      <button onClick={toggleHistory}>🗓{opened ? 'o' : 'x'}</button>
    </div>
  );
}
