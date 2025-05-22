import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeelGoodPopupComponent } from './feel-good-popup.component';

describe('FeelGoodPopupComponent', () => {
  let component: FeelGoodPopupComponent;
  let fixture: ComponentFixture<FeelGoodPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeelGoodPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeelGoodPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
