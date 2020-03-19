import { Component, OnInit } from '@angular/core';
import { PlayerModel } from '../../models/player.model';
import { NgForm } from '@angular/forms';
import { PlayersService } from '../../services/players.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit {

  player = new PlayerModel();

  constructor(private playersService: PlayersService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this.player = this.playersService.getPlayer(id);
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario no válido');
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this.playersService.actualizarPlayer(this.player, id);
    } else {
      this.playersService.crearPlayer(this.player);
    }
  }
}
