import { TestBed } from '@angular/core/testing';

import { TsPlanService } from './ts-plan.service';

describe('TsPlanService', () => {
  let service: TsPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TsPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
