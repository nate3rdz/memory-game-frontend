import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:4000/rankings'

@Injectable({
  providedIn: 'root'
})
export class RankingsService {

  constructor(private client: HttpClient) {}

  getUserRankings(id: string): Observable<any> {
    return this.client.get(`${baseUrl}/${id}`);
  }
}
