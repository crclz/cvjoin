import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchRecordRepositoryService {

  private collectionName = "watchrecords"

  private watchedIds: Map<string, string> = new Map<string, string>();

  constructor() {
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
    for (let id of this.watchedIds.keys()) {
      ids.push(id);
    }

    return ids;
  }

  public hasWatched(id: string) {
    return id in this.watchedIds;
  }

  public setWatched(id: string) {
    this.watchedIds.set(id, "1");
    this.flush();
  }

  public removeWatch(id: string) {
    this.watchedIds.delete(id);
    this.flush();
  }
}
