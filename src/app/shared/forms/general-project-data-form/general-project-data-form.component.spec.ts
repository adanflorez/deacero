import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralProjectDataFormComponent } from './general-project-data-form.component';

describe('GeneralDataFormComponent', () => {
  let component: GeneralProjectDataFormComponent;
  let fixture: ComponentFixture<GeneralProjectDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralProjectDataFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralProjectDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
