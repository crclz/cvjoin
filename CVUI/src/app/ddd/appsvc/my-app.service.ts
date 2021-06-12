import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Anime } from '../domain/anime';
import { AnimeRepositoryService } from '../repository/anime-repository.service';
import { WatchRecordRepositoryService } from '../repository/watch-record-repository.service';

@Injectable({
  providedIn: 'root'
})
export class MyAppService {

  private refreshWatched$ = new BehaviorSubject<number>(0);
  public selectedAnimeId$: Subject<string> = new Subject<string>();

  public watchedAnime$: Observable<Anime[]>;
  public relations$: Observable<CvRelation[]>;

  constructor(
    private animeRepository: AnimeRepositoryService,
    private watchRecordRepository: WatchRecordRepositoryService,
  ) {
    // at startup, do cleaning
    this.removeInvalidWatched();

    // clean state. TODO: remove this in prod
    // this.removeAllWatched();

    this.watchedAnime$ = this.refreshWatched$.pipe(
      map(() => this.getWatched()),
      shareReplay(1)
    );

    this.relations$ = combineLatest([this.watchedAnime$, this.selectedAnimeId$]).pipe(
      map(([animes, id]) => this.buildCvRelation(id, animes)),
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

  private findCvInAnimes(cvname: string, animes: Anime[]): RelationInfo[] {
    var r: RelationInfo[] = [];

    animes.forEach(anime => {
      if (anime.cvChar.has(cvname)) {
        var character = anime.cvChar.get(cvname);
        if (character == null) {
          throw 'shit'
        }
        var relation = new RelationInfo(anime.id, anime.title, character);
        r.push(relation)
      }
    })

    return r;
  }

  private buildCvRelation(animeId: string, targetAnimes: Anime[]): CvRelation[] {
    var relations: CvRelation[] = [];

    var anime = this.animeRepository.getAnimeById(animeId);
    if (anime == null) {
      throw 'shit2'
    }

    // 反人类的 value: kay
    anime.cvChar.forEach((character, cvname) => {
      var relationInfos = this.findCvInAnimes(cvname, targetAnimes);
      var relation = new CvRelation(cvname, character, relationInfos);

      relations.push(relation);
    })

    return relations;
  }

  // Clean from watched where id not exist in AllAnimes
  private removeInvalidWatched() {
    var watchedIds = this.watchRecordRepository.getWatchedIds();
    watchedIds.forEach(id => {
      var anime = this.animeRepository.getAnimeById(id);
      if (anime == null) {
        this.watchRecordRepository.removeWatch(id);
      }
    })
  }

  public removeAllWatched() {
    var watchedIds = this.watchRecordRepository.getWatchedIds();
    watchedIds.forEach(id => {
      this.watchRecordRepository.removeWatch(id);
    })

    this.refreshWatched$.next(0);
  }
}

export class CvRelation {
  public cvname: string;
  public character: string;
  public relations: RelationInfo[];

  constructor(cvname: string, character: string, relations: RelationInfo[]) {
    this.cvname = cvname;
    this.character = character;
    this.relations = relations;
  }
}

export class RelationInfo {
  public animeId: string;
  public animeTitle: string;
  public animePlayUrl: string;
  public character: string;


  constructor(animeId: string, animeTitle: string, character: string) {
    this.animeId = animeId;
    this.animeTitle = animeTitle;
    this.character = character;

    this.animePlayUrl = `https://www.bilibili.com/bangumi/play/${animeId}`;
  }
}