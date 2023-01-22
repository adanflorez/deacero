import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicAlliancesActivitiesTableComponent } from './strategic-alliances-activities-table.component';

describe('StrategicAlliancesActivitiesTableComponent', () => {
  let component: StrategicAlliancesActivitiesTableComponent;
  let fixture: ComponentFixture<StrategicAlliancesActivitiesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StrategicAlliancesActivitiesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      StrategicAlliancesActivitiesTableComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
