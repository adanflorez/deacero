import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectivesFormComponent } from './objectives-form.component';

describe('ObjectivesFormComponent', () => {
  let component: ObjectivesFormComponent;
  let fixture: ComponentFixture<ObjectivesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObjectivesFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObjectivesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
