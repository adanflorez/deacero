import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherDocumentsFormComponent } from './other-documents-form.component';

describe('OtherDocumentsFormComponent', () => {
  let component: OtherDocumentsFormComponent;
  let fixture: ComponentFixture<OtherDocumentsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherDocumentsFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OtherDocumentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
