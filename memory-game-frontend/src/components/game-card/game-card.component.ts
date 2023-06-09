import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ClickButtonComponent} from "../click-button/click-button.component";
import IRankingsResult from "../../interfaces/IRankingsResult";
import {Subject} from "rxjs";
import env from "../../env";

function sleep(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent {
    @Output() username: string = 'test';
    @Output() buttonDisabled: boolean = false;
    @Output() closeGame: Subject<boolean> = new Subject<boolean>()
    @Input() rankings: IRankingsResult[] = [];
    @Input() timer: number = 0;
    countdownStarted: boolean = false;
    countdown: number = env.COUNTDOWN_STARTING_VALUE;
    gameStarted: boolean = false;
    timeFinished: boolean = false;

    constructor() {
    }

    retrieveRankingsData(event: any) {
      this.rankings = event;

      console.log(this.rankings);
    }

    setTImer(timer: any) {
      this.timer = timer;

      setTimeout(() => {
        this.timeFinished = true;
        this.closeGame.next(true);
      }, this.timer*1000)
    }

    async setCountdown() {
      this.countdownStarted = true;
      this.gameStarted = true;
      this.buttonDisabled = true;

      for(let i = 0; i < env.COUNTDOWN_STARTING_VALUE; i++) {
        await sleep(1000);
        this.countdown--;
      }

      this.buttonDisabled = false;
      this.countdownStarted = false;
    }
}
