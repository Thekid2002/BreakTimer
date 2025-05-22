import { TestBed } from '@angular/core/testing';

import { BreakWorkHistoryService } from './break-work-history.service';

describe('BreakWorkHistoryService', () => {
  let service: BreakWorkHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakWorkHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
