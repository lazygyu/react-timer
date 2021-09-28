import { Action } from "redux";
import { AbstractMutator } from "./mutators/AbstractMutator";

export type PayloadAction<T, A> = Action & {
  payload: AbstractMutator<T, A>;
};

export function isPayloadAction<T, A>(
  action: any
): action is PayloadAction<T, A> {
  return (
    action && "payload" in action && action.payload instanceof AbstractMutator
  );
}
