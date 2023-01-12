import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultisiteManagementTableComponent } from './multisite-management-table.component';

describe('MultisiteManagementTableComponent', () => {
  let component: MultisiteManagementTableComponent;
  let fixture: ComponentFixture<MultisiteManagementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultisiteManagementTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultisiteManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
