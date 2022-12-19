import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBudgetFormComponent } from './project-budget-form.component';

describe('ProjectBudgetFormComponent', () => {
  let component: ProjectBudgetFormComponent;
  let fixture: ComponentFixture<ProjectBudgetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectBudgetFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectBudgetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
