import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { WatchRecordRepositoryService } from '../ddd/repository/watch-record-repository.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  constructor(
    private watchRecordRepository: WatchRecordRepositoryService
  ) { }

  ngOnInit(): void {
    this.saveWatched()
  }

  saveWatched() {
    var watched = `
https://www.bilibili.com/bangumi/play/ss2667/
https://www.bilibili.com/bangumi/play/ss1057/
https://www.bilibili.com/bangumi/play/ss34230/
https://www.bilibili.com/bangumi/play/ss6446/
https://www.bilibili.com/bangumi/play/ss34715/
https://www.bilibili.com/bangumi/play/ss24572/
https://www.bilibili.com/bangumi/play/ss2580/
https://www.bilibili.com/bangumi/play/ss963/
https://www.bilibili.com/bangumi/play/ss5798/
https://www.bilibili.com/bangumi/play/ss36429/
https://www.bilibili.com/bangumi/play/ss25733/
https://www.bilibili.com/bangumi/play/ss2660/
https://www.bilibili.com/bangumi/play/ss5800/
https://www.bilibili.com/bangumi/play/ss1672/
https://www.bilibili.com/bangumi/play/ss29590/
    `

    var r = /bangumi\/play\/(ss[\d]+)/g

    var ids: string[] = []

    var matches = watched.matchAll(r);

    for (let m of matches) {
      ids.push(m[1]);
    }

    console.log(ids);

    ids.forEach(p => {
      this.watchRecordRepository.setWatched(p)

    })

  }

}
