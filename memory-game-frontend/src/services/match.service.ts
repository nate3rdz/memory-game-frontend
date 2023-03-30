import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:4000/match'

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private client: HttpClient) {}

  createMatch(userId: string): Observable<any> {
    return this.client.post(`${baseUrl}`, {user: userId});
  }

  closeMatch(userId: string): Observable<any> {
    return this.client.patch(`${baseUrl}/${userId}`, {closedAt: Date.now()});
  }
}
