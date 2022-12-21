import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundManagerFormComponent } from './fund-manager-form.component';

describe('FundManagerFormComponent', () => {
  let component: FundManagerFormComponent;
  let fixture: ComponentFixture<FundManagerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FundManagerFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FundManagerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
