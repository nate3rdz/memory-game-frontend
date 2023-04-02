import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserService} from "../../services/user.service";
import {MatchService} from "../../services/match.service";
import IRankingsResult from "../../interfaces/IRankingsResult";
import {RankingsService} from "../../services/rankings.service";

enum STATUS_STRINGS {
  'Registrati!',
  'Inizia match',
  'Concludi match'
}

@Component({
  selector: 'app-click-button',
  templateUrl: './click-button.component.html',
  styleUrls: ['./click-button.component.scss']
})
export class ClickButtonComponent {

  @Input() username: string = '';
  @Output() results = new EventEmitter<IRankingsResult[]>();
  @Output() timer = new EventEmitter<number>();
  private status: number = 0;
  public statusString: string;
  private userId: string = '';
  private matchId: string = '';

  constructor(private userService: UserService, private matchService: MatchService, private rankingsService: RankingsService) {
    this.statusString = STATUS_STRINGS[0];
  }

  public async buttonClick() {
    switch(this.status) {
      case 0: // if the user should register..
      {
        this.userService.createUser(this.username).subscribe((data: {_id: string}) => {
          this.userId = data._id;

          this.status = 1;
          this.statusString = STATUS_STRINGS[1];
        });
        break;
      }
      case 1: // if the user should start the match..
      {
        this.matchService.createMatch(this.userId).subscribe((data: {_id: string, user: string, closed: boolean, createdAt: string}) => {
          this.matchId = data._id;

          this.status = 2;
          this.statusString = STATUS_STRINGS[2];

          this.timer.emit(10); // starts the timer
        });
        break;
      }
      case 2: // if the user should end the match..
      {
        this.matchService.closeMatch(this.matchId).subscribe(() => { // close the matcher
          this.rankingsService.getUserRankings(this.userId).subscribe((data: IRankingsResult[]) => { // retrieves the rankings
            this.results.emit(data);
          })
        });
        break;
      }
    }
  }
}
