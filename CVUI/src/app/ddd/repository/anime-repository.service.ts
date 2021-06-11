import { Injectable } from '@angular/core';
import rawAnime from '../../../../../data/3-animes.json'
import { Anime } from '../domain/anime';

@Injectable({
  providedIn: 'root'
})
export class AnimeRepositoryService {

  private animes: Anime[] = []

  private idMap = new Map<string, Anime>();

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

      // ssid
    }

  }

  public get allAnimes() {
    return this.animes;
  }

}
