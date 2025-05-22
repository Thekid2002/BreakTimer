import { Injectable } from '@angular/core';
import {TimeSlot} from '../models/time-slot';

@Injectable({
  providedIn: 'root'
})
export class BreakWorkHistoryService {

  constructor() { }

  getBreakWorkHistory(): TimeSlot[] {
    let jsonVal = localStorage.getItem('breakWorkHistory')
    if (jsonVal) {
      return JSON.parse(jsonVal);
    }
    localStorage.setItem('breakWorkHistory', JSON.stringify([]))
    jsonVal = localStorage.getItem('breakWorkHistory')
    if (!jsonVal) {
      throw 'Break work history not found'
    }
    return JSON.parse(jsonVal);
  }

  updateBreakWorkHistory(timeSlot: TimeSlot): void {
    let breakWorkHistory = this.getBreakWorkHistory();
    breakWorkHistory.push(timeSlot);
    this.setBreakWorkHistory(breakWorkHistory);
  }

  private setBreakWorkHistory(breakWorkHistory: TimeSlot[]): void {
    localStorage.setItem('breakWorkHistory', JSON.stringify(breakWorkHistory));
  }
}
