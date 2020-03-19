import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { PlayerModel } from '../../models/player.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html'
})
export class PlayersComponent implements OnInit {

  players: PlayerModel[] = [];
  cargando = false;

  constructor(private playersService: PlayersService) { }

  ngOnInit() {
    this.cargando = true;
    this.players = this.playersService.cargarStorage();
    this.cargando = false;

    if (this.players.length === 0) {
      this.playersService.getPlayers()
        .subscribe((resp: any) => {
          this.players = resp.data;
          this.cargando = false;
        });
    }
  }

  borrarPlayer(i: number) {
    this.playersService.borrarPlayer(i);
  }

}
