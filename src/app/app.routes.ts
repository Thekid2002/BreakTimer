import { Routes } from '@angular/router';
import {BreakTimerComponent} from './break-timer/break-timer.component';
import {BreakWorkHistoryComponent} from './break-work-history/break-work-history.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: BreakTimerComponent},
  { path: 'history', component: BreakWorkHistoryComponent}
];
