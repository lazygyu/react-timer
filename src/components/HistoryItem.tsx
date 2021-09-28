import React from "react";
import { useDispatch } from "react-redux";
import { SetDurationAndCount } from "../redux/modules/mutators/SetDurationAndCount";
import { SetHistoryOpened } from "../redux/modules/mutators/SetHistoryOpen";

export function HistoryItem({
  totalCount,
  duration,
}: {
  totalCount: number;
  duration: number;
}) {
  const dispatch = useDispatch();

  const applyItem = () => {
    dispatch(new SetDurationAndCount(duration, totalCount).action());
    dispatch(new SetHistoryOpened(false).action());
  };

  return (
    <div className="historyItem" onClick={applyItem}>
      <strong>{duration}</strong> 초 &times;
      <strong>{totalCount}</strong> 회
    </div>
  );
}
