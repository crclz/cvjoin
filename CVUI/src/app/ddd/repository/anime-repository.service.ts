import { Injectable } from '@angular/core';
import rawAnime from '../../../../../data/3-animes.json'
import { Anime } from '../domain/anime';

@Injectable({
  providedIn: 'root'
})
export class AnimeRepositoryService {

  public animes: Anime[] = []

  constructor() {
    // console.log(rawAnime)
    for (var x of rawAnime) {
      var anime = new Anime();
      anime.title = x.title;
      anime.watchUrl = x.viewUrl;

      for (var [character, cv] of x.cv) {
        anime.cvChar.set(cv, character);
      }

      this.animes.push(anime)
    }

    console.log(this.animes)
  }
}
