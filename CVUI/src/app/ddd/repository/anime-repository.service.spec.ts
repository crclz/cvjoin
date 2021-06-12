import { TestBed } from '@angular/core/testing';

import { AnimeRepositoryService } from './anime-repository.service';

describe('AnimeRepositoryService', () => {
  let service: AnimeRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimeRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
