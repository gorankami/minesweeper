import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators";
import { Cell } from "../Cell";
import { countSurroundingMines } from "../services/navigation";
import { getSettings } from "../services/settings";
import GCell from "./g-cell";

@customElement("g-table")
export default class GTable extends LitElement {
  @property() size: number = 10;
  @state() cells: Array<Cell> = [];

  connectedCallback(): void {
    this.cells = [];
    for (var rowNum = 0; rowNum < this.size; rowNum++) {
      for (var colNum = 0; colNum < this.size; colNum++) {
        this.cells.push({ rowNum, colNum } as Cell);
      }
    }
  }

  getMine(rowNum: number, colNum: number): GCell | null | undefined{
    return this.shadowRoot?.querySelector(`g-cell[data-row=${rowNum}][data-column=${colNum}]`)
  }

  plantMines (numMines: number, avoidanceCell: Cell) {
    const {size} = getSettings();
    let minesPlanted = 0;
    const safeCellIndexes: Array<number> = [];
    let avoidanceCellindex = -1;
    this.cells.forEach(function (cell, index) {
      if (cell === avoidanceCell) {
        avoidanceCellindex = index;
      } else {
        safeCellIndexes.push(index);
      }
    });
    while (minesPlanted < numMines) {
      const randIndex = Math.floor(Math.random() * safeCellIndexes.length);
      const randCellIndex = safeCellIndexes.splice(randIndex, 1)[0];
      this.getMine(Math.floor(randCellIndex / size), randCellIndex % size )?.plantMine();
      minesPlanted++;
    }
    //calculate mine count
    safeCellIndexes.push(avoidanceCellindex);
  
    //closure reach
    var cells = this.cells;
    safeCellIndexes.forEach(function (cellIndex) {
      cells[cellIndex].surroundingMinesCount =
        countSurroundingMines(
          cells[cellIndex],
          cells,
          size
        );
    });
  }

  render() {
    const {size} = getSettings(); 
    return html`<table>
      ${[...Array(size).keys()].map((i) => html`<tr>
        ${[...Array(size).keys()].map((j) => {
          return html`<g-cell data-row=${i} data-column=${j} .rowNum=${i} .colNum=${j}></g-cell>`;
        })}
      </tr>`
      )}
    </table>`;
  }
}


