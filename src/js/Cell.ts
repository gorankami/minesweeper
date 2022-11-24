import { UI_STATES } from "./enums/ui-states";

export interface Cell {
  rowNum: number;
  colNum: number;
  hasMine: boolean;
  hasExploded: boolean;
  surroundingMinesCount: number;
  uiState: UI_STATES;
  previousUiState: UI_STATES;
}
