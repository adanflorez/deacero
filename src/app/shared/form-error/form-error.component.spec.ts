import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorControlComponent } from './form-error.component';

describe('ErrorControlComponent', () => {
  let component: ErrorControlComponent;
  let fixture: ComponentFixture<ErrorControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
