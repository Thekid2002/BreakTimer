import { TestBed } from '@angular/core/testing';

import { ActiveWorkBreakService } from './active-work-break.service';

describe('ActiveWorkBreakService', () => {
  let service: ActiveWorkBreakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveWorkBreakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
