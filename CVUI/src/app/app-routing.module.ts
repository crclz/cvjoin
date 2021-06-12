import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundComponent } from './playground/playground.component';
import { WatchManagementComponent } from './playground/watch-management/watch-management.component';

const routes: Routes = [
  { path: "", component: PlaygroundComponent },
  { path: "manage", component: WatchManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
