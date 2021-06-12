import { TestBed } from '@angular/core/testing';

import { WatchRecordRepositoryService } from './watch-record-repository.service';

describe('WatchRecordRepositoryService', () => {
  let service: WatchRecordRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchRecordRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
