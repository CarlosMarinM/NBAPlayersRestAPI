import { Injectable } from '@angular/core';
import { PlayerModel } from '../models/player.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private players: PlayerModel[] = [];
  private url = 'https://www.balldontlie.io/api/v1/players';

  constructor(private http: HttpClient) { }

  crearPlayer(player: PlayerModel) {
    this.players.push(player);
    this.guardarStorage();
  }

  actualizarPlayer(player: PlayerModel, id: string) {
    this.players[id] = player;
    this.guardarStorage();
  }

  borrarPlayer(id: number) {
    this.players.splice(id, 1);
    this.guardarStorage();
  }

  getPlayer(id: string) {
    return this.players[id];
  }

  getPlayers() {
    const obs = this.http.get(this.url);
    obs.subscribe((response: any) => {
      this.players = response.data;
      this.guardarStorage();
    });

    return obs;
  }

  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.players));
  }

  cargarStorage() {
    if (localStorage.getItem('data')) {
      this.players = JSON.parse(localStorage.getItem('data'));
    }

    return this.players;
  }
}
