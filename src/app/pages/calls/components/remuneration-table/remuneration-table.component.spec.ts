import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemunerationTableComponent } from './remuneration-table.component';

describe('RemunerationTableComponent', () => {
  let component: RemunerationTableComponent;
  let fixture: ComponentFixture<RemunerationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemunerationTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemunerationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
