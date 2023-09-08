import {Component, OnInit} from '@angular/core';
import {Player} from "./player";
import {PlayerService} from "./player.service";
import {HttpErrorResponse} from "@angular/common/http";
//import alert from "$GLOBAL$";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public players: Player[] | undefined;

  constructor(private playerService: PlayerService) {
  }

  public getPlayers(): void {
    this.playerService.getPlayers().subscribe(
      (response: Player[]) => {
        this.players = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  ngOnInit(): void {
    this.getPlayers();
  }
}
