import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakWorkHistoryComponent } from './break-work-history.component';

describe('BreakWorkHistoryComponent', () => {
  let component: BreakWorkHistoryComponent;
  let fixture: ComponentFixture<BreakWorkHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakWorkHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakWorkHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
