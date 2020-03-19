import { Injectable } from '@angular/core';
import { PlayerModel } from '../models/player.model';
import { HttpClient } from '@angular/common/http';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private players: PlayerModel[] = [];
  private url = 'https://www.balldontlie.io/api/v1/players';

  constructor(private http: HttpClient) { }

  buscarPlayers(id: number=0, nombre: string, posicion: string) {
    let playersId: PlayerModel[] = [];
    let playersNombre: PlayerModel[] = [];
    let playersPosicion: PlayerModel[] = [];
    nombre = nombre.toLowerCase();
    posicion = posicion.toLowerCase();

    for (let i = 0; i < this.players.length; i++) {
      let player = this.players[i];
      if (id == player.id || id == 0) {
          playersId.push(player);
      }
    }    

    for (let i = 0; i < playersId.length; i++) {
      let player = playersId[i];
      let firstName = player.first_name.toString().toLowerCase();
      if (firstName.indexOf(nombre) >= 0) {
          playersNombre.push(player);
      }
    }

    for (let i = 0; i < playersNombre.length; i++) {
      let player = playersNombre[i];
      let position = player.position.toString().toLowerCase();
      if (position.indexOf(posicion) >= 0) {
          playersPosicion.push(player);
      }
    }
    
    return playersPosicion;
}

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
