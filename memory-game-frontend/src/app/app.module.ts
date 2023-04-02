import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClickButtonComponent } from '../components/click-button/click-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { GameCardComponent } from '../components/game-card/game-card.component';
import {UserService} from "../services/user.service";
import {MatchService} from "../services/match.service";
import {HttpClientModule} from "@angular/common/http";

import {FormsModule} from '@angular/forms';
import {RankingsService} from "../services/rankings.service";

@NgModule({
  declarations: [
    AppComponent,
    ClickButtonComponent,
    GameCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService, MatchService, RankingsService],
  bootstrap: [AppComponent, ClickButtonComponent, GameCardComponent]
})
export class AppModule { }
