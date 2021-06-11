import { Component } from '@angular/core';
import { AnimeRepositoryService } from './ddd/repository/anime-repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CVUI';

  /**
   *
   */
  constructor(public animeRepository: AnimeRepositoryService) {
    console.log("HELLOOOOOOO")
  }
}
