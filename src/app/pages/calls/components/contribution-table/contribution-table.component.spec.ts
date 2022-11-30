import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionTableComponent } from './contribution-table.component';

describe('ContributionTableComponent', () => {
  let component: ContributionTableComponent;
  let fixture: ComponentFixture<ContributionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
