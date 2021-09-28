import { AbstractMutator } from "./AbstractMutator";
import { ViewState, ViewActionTypes } from "../viewModel";

export class SetHistoryOpened extends AbstractMutator<
  ViewState,
  ViewActionTypes
> {
  public interests: ViewActionTypes = ViewActionTypes.SET_HISTORY_OPENED;

  private opened: boolean;

  constructor(opened: boolean) {
    super();
    this.opened = opened;
  }

  public apply(state: { historyOpened: boolean }): { historyOpened: boolean } {
    return {
      ...state,
      historyOpened: this.opened,
    };
  }
}
