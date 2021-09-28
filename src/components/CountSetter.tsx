import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetDuration } from "../redux/modules/mutators/SetDuration";
import { SetTotalCount } from "../redux/modules/mutators/SetTotalCount";
import { TimerState } from "../redux/modules/timerModel";
import "../scss/CountSetter";

export function CountSetter() {
  const dispatch = useDispatch();
  const { totalCount, duration } = useSelector(
    (state: { timer: TimerState }) => state.timer.settings
  );
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "duration":
        dispatch(new SetDuration(parseFloat(value) || 1).action());
        break;
      case "count":
        dispatch(new SetTotalCount(parseInt(value, 10) || 1).action());
        break;
    }
  };

  return (
    <div className="CountSetter">
      <input
        type="number"
        min="1"
        max="99"
        step="1"
        name="duration"
        value={duration}
        onChange={handleInput}
        pattern="\\d+"
      />
      초 &times;
      <input
        type="number"
        min="1"
        name="count"
        value={totalCount}
        onChange={handleInput}
        pattern="\\d+"
      />
      회
    </div>
  );
}
