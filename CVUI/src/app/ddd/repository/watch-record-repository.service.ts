import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchRecordRepositoryService {

  private collectionName = "watchrecords"

  private watchedIds: any = {};

  constructor() {
    console.log("a", JSON.stringify(this.watchedIds))
    // init collection
    var loaded = this.load();
    if (!loaded) {
      // first time
      this.flush();
    }
  }

  private load(): boolean {
    var data = localStorage.getItem(this.collectionName);
    if (data == null) {
      return false;
    }
    this.watchedIds = JSON.parse(data);
    return true;
  }

  private flush() {
    localStorage.setItem(this.collectionName, JSON.stringify(this.watchedIds))
  }

  public getWatchedIds(): string[] {
    var ids: string[] = [];
    for (let id in this.watchedIds) {
      ids.push(id);
    }

    return ids;
  }

  public hasWatched(id: string) {
    return id in this.watchedIds;
  }

  public setWatched(id: string) {
    this.watchedIds[id] = 1;
    this.flush();
  }

  public removeWatch(id: string) {
    delete this.watchedIds[id];
    this.flush();
  }
}
