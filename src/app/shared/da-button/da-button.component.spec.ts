import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaButtonComponent } from './da-button.component';

describe('ButtonComponent', () => {
  let component: DaButtonComponent;
  let fixture: ComponentFixture<DaButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DaButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
