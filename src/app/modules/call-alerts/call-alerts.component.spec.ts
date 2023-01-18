import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallAlertsComponent } from './call-alerts.component';

describe('CallAlertsComponent', () => {
  let component: CallAlertsComponent;
  let fixture: ComponentFixture<CallAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallAlertsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CallAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
