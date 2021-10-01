import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetHistoryOpened } from "../redux/modules/mutators/SetHistoryOpen";
import { State } from "../redux/store";
import "../scss/setter.scss";
import { CountSetter } from "./CountSetter";

export function Setter() {
  const dispatch = useDispatch();
  const opened = useSelector((state: State) => state.view.historyOpened);
  const toggleHistory = () => {
    dispatch(SetHistoryOpened.action(!opened));
  }

  return (
    <div className="setter">
      <CountSetter />
      <button onClick={toggleHistory}>🗓</button>
    </div>
  );
}
