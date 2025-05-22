import { Injectable } from '@angular/core';
import {TimeSlot} from '../models/time-slot';
import {Comfort} from '../models/comfort';
import {BreakWorkHistoryService} from './break-work-history.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveWorkBreakService {
  constructor(private breakWorkHistoryService: BreakWorkHistoryService) { }

  public setCurrentActiveTimeSlot(timeSlot: TimeSlot): void {
    localStorage.setItem('currentActiveTimeSlot', JSON.stringify(timeSlot));
  }

  public getCurrentActiveTimeSlot(): TimeSlot | null {
    const jsonVal = localStorage.getItem('currentActiveTimeSlot');
    if (jsonVal) {
      const parsedVal = JSON.parse(jsonVal);
      const timeSlot = new TimeSlot(
        parsedVal.expectedDuration,
        parsedVal.actualDuration,
        new Date(parsedVal.startDateTime),
        new Date(parsedVal.endDateTime),
        parsedVal.type,
        parsedVal.comfortBefore,
        parsedVal.comfortAfter
      );
      if (timeSlot.endDateTime.getTime() > Date.now()) {
        return timeSlot;
      }else {
        localStorage.removeItem('currentActiveTimeSlot');
      }
    }
    return null;
  }

  public finishCurrentActiveTimeSlot(comfortAfter: Comfort): void {
    const jsonVal = localStorage.getItem('currentActiveTimeSlot');
    if (jsonVal) {
      const parsedVal = JSON.parse(jsonVal);
      const timeSlot = new TimeSlot(
        parsedVal.expectedDuration,
        (Date.now() - new Date(parsedVal.startDateTime).getTime())/1000/60,
        new Date(parsedVal.startDateTime),
        new Date(),
        parsedVal.type,
        parsedVal.comfortBefore,
        comfortAfter
      );
      localStorage.removeItem('currentActiveTimeSlot');
      this.breakWorkHistoryService.updateBreakWorkHistory(timeSlot);
    }
    else {
      throw new Error('No active time slot found');
    }
  }
}
