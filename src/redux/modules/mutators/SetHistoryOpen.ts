import { ViewMutator, ViewPayloadAction } from "./AbstractMutator";
import { ViewActionTypes } from "../viewModel";

export class SetHistoryOpened extends ViewMutator {
  public interests: ViewActionTypes = ViewActionTypes.SET_HISTORY_OPENED;
  private opened: boolean;

  static action(opened: boolean): ViewPayloadAction {
    return new SetHistoryOpened(opened).action();
  }

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
