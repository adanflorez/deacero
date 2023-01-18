import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationsTableComponent } from './donations-table.component';

describe('DonationsTableComponent', () => {
  let component: DonationsTableComponent;
  let fixture: ComponentFixture<DonationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonationsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DonationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
