import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MyAppService } from '../ddd/appsvc/my-app.service';
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
  ) { }

  importerInput = "";

  ngOnInit(): void {
  }

  importWatched() {
    var r = /(ss\d+)/g
    var matches = this.importerInput.matchAll(r);

    for (var m of matches) {
      var id = m[1];

      var ok = this.appsvc.addWatched(id);
      console.log(`ok: ${ok}, id: ${id}`)
    }
  }

}
