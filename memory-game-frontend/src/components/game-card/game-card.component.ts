import {Component, Input, Output} from '@angular/core';
import {ClickButtonComponent} from "../click-button/click-button.component";
import IRankingsResult from "../../interfaces/IRankingsResult";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent {
    @Output() username: string = 'test';
    @Input() rankings: IRankingsResult[] = [];
    @Input() timer: number = 0;
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
      }, this.timer*1000)
    }
}
