import {TimeSlotType} from './time-slot-type';
import {Comfort} from './comfort';

export class TimeSlot {
  expectedDuration: number;
  actualDuration: number | null;
  startDateTime: Date;
  endDateTime: Date;
  type: TimeSlotType;
  comfortBefore: Comfort;
  comfortAfter: Comfort | null;

  constructor(
    expectedDuration: number,
    actualDuration: number | null,
    startDateTime: Date,
    endDateTime: Date,
    type: TimeSlotType,
    comfortBefore: Comfort,
    comfortAfter: Comfort | null
  ) {
    this.expectedDuration = expectedDuration;
    this.actualDuration = actualDuration;
    this.startDateTime = startDateTime;
    this.endDateTime = endDateTime;
    this.type = type;
    this.comfortBefore = comfortBefore;
    this.comfortAfter = comfortAfter;
  }
}
