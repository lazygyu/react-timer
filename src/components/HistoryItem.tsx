import React from "react";
import { useDispatch } from "react-redux";
import { RemoveHistoryItem } from "../redux/modules/mutators/RenameHistoryItem";
import { SetDurationAndCount } from "../redux/modules/mutators/SetDurationAndCount";
import { SetHistoryOpened } from "../redux/modules/mutators/SetHistoryOpen";

export function HistoryItem({
  totalCount,
  duration,
  index,
}: {
  totalCount: number;
  duration: number;
  index: number;
}) {
  const dispatch = useDispatch();

  const applyItem = () => {
    dispatch(new SetDurationAndCount(duration, totalCount).action());
    dispatch(new SetHistoryOpened(false).action());
  };

  const removeItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(new RemoveHistoryItem(index).action());
  };

  return (
    <div className="historyItem" onClick={applyItem}>
      <strong>{duration}</strong> 초 &times;
      <strong>{totalCount}</strong> 회
      <button onClick={removeItem} className='btnDelete'>&times;</button>
    </div>
  );
}
