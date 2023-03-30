import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:4000/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client: HttpClient) {}

  async getUser(id: string) {
    this.client.get(`${baseUrl}/${id}`).subscribe((data: any) => {
      return data;
    })
  }

  createUser(nickname: string): Observable<any> {
    return this.client.post(`${baseUrl}`, {nickname: nickname});
  }
}
