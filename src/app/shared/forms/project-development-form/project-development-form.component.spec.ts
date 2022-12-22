import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDevelopmentFormComponent } from './project-development-form.component';

describe('ProjectDevelopmentFormComponent', () => {
  let component: ProjectDevelopmentFormComponent;
  let fixture: ComponentFixture<ProjectDevelopmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectDevelopmentFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDevelopmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
