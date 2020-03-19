import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersComponent } from './pages/players/players.component';
import { PlayerComponent } from './pages/player/player.component';


const routes: Routes = [
  { path: 'players', component: PlayersComponent },
  { path: 'player/:id', component: PlayerComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'players' },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
