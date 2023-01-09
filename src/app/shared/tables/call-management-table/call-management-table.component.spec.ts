import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallManagementTableComponent } from './call-management-table.component';

describe('CallManagementTableComponent', () => {
  let component: CallManagementTableComponent;
  let fixture: ComponentFixture<CallManagementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallManagementTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CallManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
