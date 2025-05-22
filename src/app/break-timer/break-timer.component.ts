import {Component, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {WorkService} from '../services/work.service';
import {BreakService} from '../services/break.service';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {TimeSlot} from '../models/time-slot';
import {TimeSlotType} from '../models/time-slot-type';
import {BreakWorkHistoryService} from '../services/break-work-history.service';
import {FeelGoodPopupComponent} from '../feel-good-popup/feel-good-popup.component';
import {MatDialog} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {Comfort} from '../models/comfort';
import {ActiveWorkBreakService} from '../services/active-work-break.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-break-timer',
  imports: [
    MatLabel,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    FormsModule,
    NgIf
  ],
  templateUrl: './break-timer.component.html',
  styleUrl: './break-timer.component.scss'
})
export class BreakTimerComponent implements OnInit {
  public TimeSlotType = TimeSlotType;

  public stopCountdown: boolean = false;

  public comfortBefore!: Comfort;
  public currentActiveTimeSlot: TimeSlot | null = null;

  public selectedTime: number | null = null;
  public type: TimeSlotType | null = null;

  constructor(private workService: WorkService, private breakService: BreakService,
              private breakWorkHistoryService: BreakWorkHistoryService, private dialog: MatDialog,
              private activeWorkBreakService: ActiveWorkBreakService
  ) {
    this.currentActiveTimeSlot = this.activeWorkBreakService.getCurrentActiveTimeSlot();
  }

  ngOnInit() {
    this.requestNotificationPermission();
    if (!this.currentActiveTimeSlot) {
      this.checkComfort().subscribe(
        comfort => this.comfortBefore = comfort
      );
    }else {
      this.countDown()
    }
  }

  public checkComfort(): Observable<Comfort> {
    const options = [Comfort.VERY_BAD.valueOf(), Comfort.BAD.valueOf(), Comfort.OK.valueOf(), Comfort.GOOD.valueOf(), Comfort.VERY_GOOD.valueOf()];
    const dialogRef = this.dialog.open(FeelGoodPopupComponent, {
      width: '300px',
      disableClose: true,
      data: {
        message: 'How do you feel before work?',
        options: options,
      }
    });

    return dialogRef.afterClosed();
  }

  public start() {
    if (!this.type) {
      alert('Please select type');
      return;
    }
    if (!this.selectedTime) {
      alert('Please select time');
      return;
    }
    let startDateTime = new Date();
    let endDateTime = new Date(startDateTime.getTime() + (this.selectedTime * 60 * 1000));
    this.currentActiveTimeSlot = new TimeSlot(this.selectedTime, null, startDateTime, endDateTime, this.type, this.comfortBefore, null);
    this.activeWorkBreakService.setCurrentActiveTimeSlot(this.currentActiveTimeSlot);
    this.countDown();
  }

  public getWorkTimes(): number[] {
    const times = this.workService.getWorkTimes().sort((a, b) => a - b);
    if (this.comfortBefore === Comfort.VERY_BAD || this.comfortBefore === Comfort.BAD) {
      return times.filter(t => t <= 15);
    } else if (this.comfortBefore === Comfort.GOOD || this.comfortBefore === Comfort.VERY_GOOD) {
      return times.filter(t => t >= 25);
    }
    return times;
  }

  public getBreakTimes(): number[] {
    const times = this.breakService.getBreakTimes().sort((a, b) => a - b);
    if (this.comfortBefore === Comfort.VERY_BAD || this.comfortBefore === Comfort.BAD) {
      return times.filter(t => t >= 15);
    } else if (this.comfortBefore === Comfort.GOOD || this.comfortBefore === Comfort.VERY_GOOD) {
      return times.filter(t => t <= 10);
    }
    return times;
  }

  private async requestNotificationPermission(): Promise<void> {
    if ('Notification' in window && Notification.permission !== 'granted') {
      await Notification.requestPermission();
    }
  }

  private countDown(): void {
    if (!this.currentActiveTimeSlot) {
      throw new Error('No active time slot found');
    }
    const tick = () => {
      const remaining = Math.max(0, Math.round((this.currentActiveTimeSlot!.endDateTime.getTime() - Date.now()) / 1000));
      if (remaining <= 0 || this.stopCountdown == true) {
        this.finishCurrentActiveTimeSlot();
        this.stopCountdown = false;
        return;
      }
      setTimeout(tick, 200);
    };
    tick();
  }

  public finishCurrentActiveTimeSlot(): void {
    this.checkComfort().subscribe(comfort => {
      this.activeWorkBreakService.finishCurrentActiveTimeSlot(comfort)
      this.sendNotification(this.type +' time is up!');
      this.currentActiveTimeSlot = null;
    });
  }

  private sendNotification(message: string): void {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications.');
      alert(message);
      return;
    }
    if (Notification.permission === 'granted') {
      try {
        new Notification(message);
      } catch (e) {
        console.error('Notification error:', e);
        alert(message);
      }
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(message);
        } else {
          alert(message);
        }
      });
    } else {
      alert(message);
    }
  }

  public getTimeString(): string {
    if (this.currentActiveTimeSlot!.endDateTime <= new Date()) {
      return '00:00';
    }
    const remaining = Math.max(0, Math.round((this.currentActiveTimeSlot!.endDateTime.getTime() - Date.now()) / 1000));
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  protected readonly stop = stop;
}
