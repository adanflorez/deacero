import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicAlliancesFormComponent } from './strategic-alliances-form.component';

describe('StrategicAlliancesFormComponent', () => {
  let component: StrategicAlliancesFormComponent;
  let fixture: ComponentFixture<StrategicAlliancesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StrategicAlliancesFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StrategicAlliancesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
