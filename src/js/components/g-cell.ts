import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators";
import { Cell } from "../Cell";
import { UI_STATES } from "../enums/ui-states";
import { getIconForCell } from "../services/icon";
import { decrementFlags, incrementFlags } from "../services/settings";

@customElement("g-cell")
export default class GCell extends LitElement implements Cell {
  @property() rowNum: number = 0;
  @property() colNum: number = 0;
  @property() hasMine: boolean = false;
  @property() hasExploded: boolean = false;
  @property() surroundingMinesCount: number = 0;
  @property() uiState: UI_STATES = UI_STATES.HIDDEN;
  @property() previousUiState: UI_STATES = UI_STATES.HIDDEN;

  plantMine() {
    this.hasMine = true;
  }

  revertState() {
    this.uiState = this.previousUiState;
  }

  changeState(newState: UI_STATES) {
    this.previousUiState = this.uiState;
    this.uiState = newState;
  }

  tryPeek() {
    if (this.uiState === UI_STATES.HIDDEN) {
      this.changeState(UI_STATES.BEING_PRESSED);
      return true;
    } else {
      return false;
    }
  }

  toggleFlag() {
    if (this.uiState === UI_STATES.FLAGGED) {
      this.changeState(UI_STATES.HIDDEN);
      decrementFlags();
    } else if (this.uiState === UI_STATES.HIDDEN) {
      this.changeState(UI_STATES.FLAGGED);
      incrementFlags();
    }
  }

  tryUncover() {
    if (this.uiState === UI_STATES.BEING_PRESSED) {
      this.changeState(UI_STATES.UNCOVERED);
      return true;
    } else {
      return false;
    }
  }

  explode() {
    this.hasExploded = true;
  }

  render() {
    return html`<div
      style="background-image: url(${getIconForCell(this)})"
    ></div>`;
  }
}
