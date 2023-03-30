import { Component, Output } from '@angular/core';
import {ClickButtonComponent} from "../click-button/click-button.component";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent {
    @Output() username: string = 'australopiteco';

    constructor() {
    }
}
