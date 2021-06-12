import { Component, OnInit } from '@angular/core';
import { MyAppService } from 'src/app/ddd/appsvc/my-app.service';
import { AnimeRepositoryService } from 'src/app/ddd/repository/anime-repository.service';
import { WatchRecordRepositoryService } from 'src/app/ddd/repository/watch-record-repository.service';

@Component({
  selector: 'app-watch-management',
  templateUrl: './watch-management.component.html',
  styleUrls: ['./watch-management.component.css']
})
export class WatchManagementComponent implements OnInit {

  constructor(
    private watchRecordRepository: WatchRecordRepositoryService,
    public appsvc: MyAppService,
    private animeRepository: AnimeRepositoryService,
  ) { }

  importerInput = "";
  message = "";


  ngOnInit(): void {
  }

  importWatched() {
    var r = /(ss\d+)/g
    var matches = this.importerInput.matchAll(r);

    var hasNotOk = false;
    var notOkMessage = "未收录："

    for (var m of matches) {
      var id = m[1];

      var ok = this.appsvc.addWatched(id);
      if (!ok) {
        hasNotOk = true;
        notOkMessage += `${id} `
      }
    }

    if (hasNotOk) {
      this.message = notOkMessage;
    } else {
      this.message = "";
    }
  }

}
