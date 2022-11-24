/**
 * Settings service with default values set up
 * @type {Object}
 */

import { DIFFICULTY } from "../enums/difficulty";

export interface SettingsService {
  clicksEnabled: boolean;
  flagsCount: number;
  size: number;
  minesCount: number;
}

let _settings: SettingsService = {
  clicksEnabled: true,
  flagsCount: 0,
  size: 10,
  minesCount: 10,
};

export function getSettings(): SettingsService {
  return { ..._settings };
}

export function init(difficulty: DIFFICULTY) {
  setSettingsByDifficulty(difficulty);
  _settings.clicksEnabled = true;
  _settings.flagsCount = 0;
}

export function setSettingsByDifficulty(difficulty: DIFFICULTY) {
  switch (difficulty) {
    case DIFFICULTY.MEDIUM:
      _settings.size = 15;
      _settings.minesCount = 30;
      break;
    case DIFFICULTY.HARD:
      _settings.size = 20;
      _settings.minesCount = 80;
      break;
    default:
      _settings.size = 10;
      _settings.minesCount = 10;
      break;
  }
}


export function incrementFlags(){
  _settings.flagsCount++;
}

export function decrementFlags(){
  _settings.flagsCount--;
}