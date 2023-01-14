import { TestBed } from '@angular/core/testing';

import { MultisiteService } from './multisite.service';

describe('MultisiteService', () => {
  let service: MultisiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultisiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
