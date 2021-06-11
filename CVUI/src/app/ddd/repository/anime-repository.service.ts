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
      var anime = new Anime(x.title, x.viewUrl);

      for (var [character, cv] of x.cv) {
        anime.cvChar.set(cv, character);
      }

      this.animes.push(anime)

      // id
      this.idMap.set(anime.id, anime)
    }

  }

  public get allAnimes() {
    return this.animes;
  }

  public getAnimeById(id: string): Anime | undefined {
    var anime = this.idMap.get(id)
    return anime;
  }

}
