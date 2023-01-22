import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningHoursTableComponent } from './opening-hours-table.component';

describe('OpeningHoursTableComponent', () => {
  let component: OpeningHoursTableComponent;
  let fixture: ComponentFixture<OpeningHoursTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpeningHoursTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OpeningHoursTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
