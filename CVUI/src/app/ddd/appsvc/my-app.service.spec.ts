import { TestBed } from '@angular/core/testing';

import { MyAppService } from './my-app.service';

describe('MyAppService', () => {
  let service: MyAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
