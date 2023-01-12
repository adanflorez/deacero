import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultisiteManagementComponent } from './multisite-management.component';

describe('MultisiteManagementComponent', () => {
  let component: MultisiteManagementComponent;
  let fixture: ComponentFixture<MultisiteManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultisiteManagementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultisiteManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
