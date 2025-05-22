import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor() { }

  getWorkTimes(): number[] {
    let jsonVal = localStorage.getItem('workTimes')
    if (jsonVal) {
      return JSON.parse(jsonVal);
    }
    localStorage.setItem('workTimes', JSON.stringify([5, 10, 15, 25, 30, 35, 40, 45]))
    jsonVal = localStorage.getItem('workTimes')
    if (!jsonVal) {
      throw 'Work times not found'
    }
    return JSON.parse(jsonVal);
  }
}
