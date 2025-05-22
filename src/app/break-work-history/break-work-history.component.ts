import { Component } from '@angular/core';
import {
  MatCell, MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {BreakWorkHistoryService} from '../services/break-work-history.service';

@Component({
  selector: 'app-break-work-history',
  imports: [
    MatTable,
    MatCell,
    MatHeaderCell,
    MatRow,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef
  ],
  templateUrl: './break-work-history.component.html',
  styleUrl: './break-work-history.component.scss'
})
export class BreakWorkHistoryComponent {

  public displayedColumns: string[] = ['startDateTime', 'endDateTime', 'expectedDuration', 'actualDuration', 'type', 'comfortBefore', 'comfortAfter'];
  public dataSource: any[] = [];

  constructor(private breakWorkHistoryService: BreakWorkHistoryService) {
    this.dataSource = breakWorkHistoryService.getBreakWorkHistory().sort((a, b) => {;
      return new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime();
    });
  }

  public formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toLocaleString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(',', '');
  }

  public formatDuration(minutes: number): string {
    const totalSeconds = Math.round(minutes * 60);
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}


