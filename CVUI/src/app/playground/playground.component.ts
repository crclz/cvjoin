import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, map, shareReplay } from 'rxjs/operators';
import { MyAppService } from '../ddd/appsvc/my-app.service';
import { Anime } from '../ddd/domain/anime';
import { AnimeRepositoryService } from '../ddd/repository/anime-repository.service';
import { WatchRecordRepositoryService } from '../ddd/repository/watch-record-repository.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  constructor(
    private watchRecordRepository: WatchRecordRepositoryService,
    public appsvc: MyAppService,
    private animeRepository: AnimeRepositoryService,
  ) {

    this.animeSearchResults$ = this.animeSearchWord$.pipe(
      debounceTime(300),
      map(word => {
        word = word.trim();
        if (word == "") {
          return [];
        } else {
          return this.animeRepository.findAnimes(word)
        }

      },
        shareReplay(1)
      )
    )

  }


  animeSearchInput = "";
  animeSearchWord$ = new Subject<string>();
  animeSearchResults$: Observable<Anime[]>;

  selectedAnime: Anime | null = null;

  ngOnInit(): void {


  }



  findRelations(id: string) {
    var anime = this.animeRepository.getAnimeById(id);
    if (anime == null) {
      alert("Anime not found");
      return;
    }

    this.appsvc.selectedAnimeId$.next(id)
  }

  searchInputChange(word: string) {
    this.animeSearchWord$.next(word)
  }

  selectAnime(anime: Anime) {
    this.selectedAnime = anime;
    this.appsvc.selectedAnimeId$.next(anime.id);

    this.animeSearchInput = "";
    this.searchInputChange("");
  }

}
