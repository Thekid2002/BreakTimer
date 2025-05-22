import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreakService {

  constructor() { }

  getBreakTimes(): number[] {
    let jsonVal = localStorage.getItem('breakTimes')
    if (jsonVal) {
      return JSON.parse(jsonVal);
    }
    localStorage.setItem('breakTimes', JSON.stringify([5, 10, 15, 20, 25, 30, 60]))
    jsonVal = localStorage.getItem('breakTimes')
    if (!jsonVal) {
      throw 'Break times not found'
    }
    return JSON.parse(jsonVal);
  }
}
