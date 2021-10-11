import { TestBed } from '@angular/core/testing';

import { RouterOutputService } from './router-output.service';

describe('RouterOutputService', () => {
  let service: RouterOutputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterOutputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
