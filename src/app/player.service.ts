import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Player} from "./player";
import {Statistics} from "./statistics";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  public getPlayers(): Observable<Player[]> {
    return this.httpClient.get<Player[]>(`${this.apiServerUrl}/player/all`);
  }

  public addPlayer(player: Player): Observable<Player> {
    return this.httpClient.post<Player>('${this.apiServerUrl}/player/add', player);
  }

  public updatePlayer(player: Player): Observable<Player> {
    return this.httpClient.put<Player>('${this.apiServerUrl}/player/update', player);
  }

  public deletePlayer(playerId: number): Observable<void> {
    return this.httpClient.delete<void>('${this.apiServerUrl}/player/delete/${playerId}');
  }

  public getStatistics(playerId: number): Observable<Statistics> {
    return this.httpClient.get<Statistics>('${this.apiServerUrl}/player/statistics/${playerId}');
  }

  public addStatistics(statistics: Statistics, playerId: number): Observable<Statistics> {
    return this.httpClient.post<Statistics>(`$\{this.apiServerUrl}/player/statistics/add/${playerId}`, statistics);
  }

  public updateStatistics(statistics: Statistics, playerId: number): Observable<Statistics> {
    return this.httpClient.put<Statistics>(`$\{this.apiServerUrl}/player/statistics/update/${playerId}`, statistics);
  }

  public deleteStatistics(playerId: number): Observable<void> {
    return this.httpClient.delete<void>(`$\{this.apiServerUrl}/player/statistics/delete/${playerId}`);
  }

  public deleteAllInfo(playerId: number): Observable<void> {
    return this.httpClient.delete<void>(`$\{this.apiServerUrl}/player/deleteAllInfo/${playerId}`);
  }
}
