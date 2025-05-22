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
    this.dataSource = breakWorkHistoryService.getBreakWorkHistory();
  }
}
