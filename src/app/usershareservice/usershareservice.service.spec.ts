import { TestBed } from '@angular/core/testing';

import { UsershareserviceService } from './usershareservice.service';

describe('UsershareserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsershareserviceService = TestBed.get(UsershareserviceService);
    expect(service).toBeTruthy();
  });
});
