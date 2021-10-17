import { TestBed } from '@angular/core/testing';

import { AppComponentOutputService } from './app-component-output.service';

describe('AppComponentOutputService', () => {
  let service: AppComponentOutputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppComponentOutputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
