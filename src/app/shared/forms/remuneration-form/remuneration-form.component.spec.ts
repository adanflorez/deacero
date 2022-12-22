import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemunerationFormComponent } from './remuneration-form.component';

describe('RemunerationFormComponent', () => {
  let component: RemunerationFormComponent;
  let fixture: ComponentFixture<RemunerationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemunerationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RemunerationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
