import React from "react";
import { useSelector, useStore } from "react-redux";
import { TimerState } from "../redux/modules/timerModel";
import { ViewState } from "../redux/modules/viewModel";
import { HistoryItem } from "./HistoryItem";
import '../scss/HistoryList.scss';
import { State } from "../redux/store";

export function HistoryList() {
  const { history } = useSelector((state: State) => state.timer);
  const { historyOpened } = useSelector((state: State) => state.view);
  const items = history.map((item, i) => (
    <HistoryItem key={i} totalCount={item.totalCount} duration={item.duration} />
  ));
  const classes = ["historyList", historyOpened ? "show" : "hide"];
  return <div className={classes.join(' ')}>{items}</div>;
}
