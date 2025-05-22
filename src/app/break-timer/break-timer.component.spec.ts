import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakTimerComponent } from './break-timer.component';

describe('BreakTimerComponent', () => {
  let component: BreakTimerComponent;
  let fixture: ComponentFixture<BreakTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakTimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
