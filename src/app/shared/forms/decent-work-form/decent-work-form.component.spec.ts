import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecentWorkFormComponent } from './decent-work-form.component';

describe('DecentWorkFormComponent', () => {
  let component: DecentWorkFormComponent;
  let fixture: ComponentFixture<DecentWorkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecentWorkFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DecentWorkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
