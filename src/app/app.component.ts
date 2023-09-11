import {Component, OnInit} from '@angular/core';
import {Player} from "./player";
import {PlayerService} from "./player.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Statistics} from "./statistics";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public players: Player[] | undefined;
  public editPlayer: Player | null | undefined;
  public deletePlayer: Player | null | undefined;
  public showPlayer: Player | null | undefined;
  public statistics: Statistics | undefined;
  public editStatistics: Statistics | null | undefined;
  public deleteStatistics: Statistics | null | undefined;

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

  public searchPlayer(key: string): void {
    const results: Player[] = [];
    console.log(key);
    for (const player of this.players!) {
      if (player.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(player);
      }
    }
    this.players = results;
    if (results.length === 0 || !key) {
      this.getPlayers();
    }
  }

  public getStatistics(playerId: number | undefined): void {
    this.playerService.getStatistics(playerId).subscribe(
      (response: Statistics) => {
        this.statistics = response;
        this.onOpenModal(this.showPlayer, 'show-stats');
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  public openStatisticsModal(player: Player): void {
    this.showPlayer = player; // Set the showPlayer property
    this.statistics = undefined; // Clear any previous statistics
    this.getStatistics(player.id);
  }

  ngOnInit(): void {
    this.getPlayers();
  }

  public onOpenModal(player: Player | null | undefined, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPlayerModal');
    }
    if (mode === 'edit') {
      this.editPlayer = player;
      button.setAttribute('data-target', '#updatePlayerModal');
    }
    if (mode === 'delete') {
      this.deletePlayer = player;
      button.setAttribute('data-target', '#deletePlayerModal');
    }
    if (mode === 'show-stats') {
      this.showPlayer = player;
      button.setAttribute('data-target', '#getStatisticsModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

  public onOpenStatisticsModal(statistics: Statistics | null | undefined, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editStatistics = statistics;
      button.setAttribute('data-target', '#editStatisticsModal');
    }
    if (mode === 'delete') {
      this.deleteStatistics = statistics;
      button.setAttribute('data-target', '#deleteStatisticsModal');
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
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onUpdatePlayer(player: Player) {
    //document.getElementById('close-button-3')?.click();
    this.playerService.updatePlayer(player).subscribe(
      (response: Player) => {
        console.log(response);
        this.getPlayers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeletePlayer(playerId: number | undefined) {
    document.getElementById('close-button-2')?.click();
    this.playerService.deletePlayer(playerId).subscribe(
      (response: void) => {
        console.log(response);
        this.getPlayers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  openStatisticsAndAnotherMethod(player: Player) {
    this.openStatisticsModal(player);
    this.getStatistics(player?.id)
  }

  onDeleteStatistics(playerId: number | undefined) {
    document.getElementById('close-button-4')?.click();
    this.playerService.deleteStatistics(playerId).subscribe(
      (response: void) => {
        console.log(response);
        this.getPlayers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
