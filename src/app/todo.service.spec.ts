import { TestBed } from '@angular/core/testing';

import { TODOService } from './todo.service';

describe('TODOService', () => {
  let service: TODOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TODOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
