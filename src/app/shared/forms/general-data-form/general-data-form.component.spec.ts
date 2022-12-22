import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDataFormComponent } from './general-data-form.component';

describe('GeneralDataFormComponent', () => {
  let component: GeneralDataFormComponent;
  let fixture: ComponentFixture<GeneralDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralDataFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
