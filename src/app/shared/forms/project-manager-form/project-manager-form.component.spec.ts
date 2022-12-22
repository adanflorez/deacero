import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagerFormComponent } from './project-manager-form.component';

describe('ProjectManagerFormComponent', () => {
  let component: ProjectManagerFormComponent;
  let fixture: ComponentFixture<ProjectManagerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectManagerFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectManagerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
