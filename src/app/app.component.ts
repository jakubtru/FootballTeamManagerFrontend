import {Component, OnInit} from '@angular/core';
import {Player} from "./player";
import {PlayerService} from "./player.service";
import {HttpErrorResponse} from "@angular/common/http";
//import alert from "$GLOBAL$";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NgForm} from "@angular/forms";

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

  public onOpenModal(player: Player | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode==='add'){
      button.setAttribute('data-target', '#addPlayerModal');
    }
    if (mode==='edit'){
      button.setAttribute('data-target', '#updatePlayerModal');
    }
    if (mode==='delete'){
      button.setAttribute('data-target', '#deletePlayerModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

  public onAddPlayer(addForm: NgForm) {
    document.getElementById('close-button')?.click();
    this.playerService.addPlayer(addForm.value).subscribe(
      (response: Player) => {
        console.log(response);
        this.getPlayers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
