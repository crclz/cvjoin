import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Anime } from '../domain/anime';
import { AnimeRepositoryService } from '../repository/anime-repository.service';
import { WatchRecordRepositoryService } from '../repository/watch-record-repository.service';

@Injectable({
  providedIn: 'root'
})
export class MyAppService {

  private refreshWatched$ = new BehaviorSubject<number>(0);

  public watchedAnime$: Observable<Anime[]>;

  constructor(
    private animeRepository: AnimeRepositoryService,
    private watchRecordRepository: WatchRecordRepositoryService,
  ) {
    this.watchedAnime$ = this.refreshWatched$.pipe(
      map(() => this.getWatched()),
      shareReplay(1)
    );
  }

  private getWatched(): Anime[] {
    var r: Anime[] = [];

    var watchedIds = this.watchRecordRepository.getWatchedIds();

    watchedIds.forEach(id => {
      var anime = this.animeRepository.getAnimeById(id);
      if (anime == null) {
        console.warn("Anime id not found");
        return;
      }
      r.push(anime)
    })

    return r;
  }

  public addWatched(id: string): boolean {
    var anime = this.animeRepository.getAnimeById(id);
    if (anime == null) {
      return false;
    }

    this.watchRecordRepository.setWatched(id);

    this.refreshWatched$.next(0);

    return true;
  }

  public removeWatch(id: string) {
    this.watchRecordRepository.removeWatch(id);

    this.refreshWatched$.next(0);
  }

  public getAllAnimes(): Anime[] {
    return this.animeRepository.allAnimes;
  }

}
