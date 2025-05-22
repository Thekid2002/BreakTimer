import { TestBed } from '@angular/core/testing';

import { BreakService } from './break.service';

describe('BreakService', () => {
  let service: BreakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
