import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodFormComponent } from './period-form.component';

describe('PeriodFormComponent', () => {
  let component: PeriodFormComponent;
  let fixture: ComponentFixture<PeriodFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeriodFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeriodFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
