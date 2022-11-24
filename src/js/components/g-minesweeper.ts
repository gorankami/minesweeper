import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { DIFFICULTY } from "../enums/difficulty";
import { cacheIcons } from "../services/icon";
import { getSettings, init } from "../services/settings";


@customElement("g-minesweeper")
export default class GMinesweeper extends LitElement {
  @state() _isFirstClick = false;
    @state() _isMsgWinShown = false;
    @state() _isMsgLoseShown = false;

  connectedCallback(){
    cacheIcons();

  }

  newGame(difficulty: DIFFICULTY){
    init(difficulty);
  
    


  msgWin.hide();
  msgLose.hide();
  const newCss = {
    "line-height": 16 * settingsService.size + "px",
    width: 16 * settingsService.size
  };
  msgWin.css(newCss);
  msgLose.css(newCss);
  refreshFlagCount();
  }

  render() {
    const { size } = getSettings();
    const msgStyle = `line-height: ${16*size}px;width: ${16*size}px;`
    return html`
      <div>
        <button class="new-game" type="button" id="btn-easy">Easy</button>
        <button class="new-game" type="button" id="btn-medium">medium</button>
        <button class="new-game" type="button" id="btn-hard">Hard</button>
      </div>
      <div id="game-container">
        ${this._isMsgWinShown ? html`<div class="message win-message" style=${styleMap(styles)} style=${msgStyle}>😁</div>` : nothing}
        ${this._isMsgLoseShown ? html`<div class="message lose-message" style=${msgStyle}>☠</div>` : nothing}
        <g-table></g-table>
      </div>
      <div id="flag-count"></div>
    `;
  }
}
