import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../services/user.service";
import {MatchService} from "../../services/match.service";
import IRankingsResult from "../../interfaces/IRankingsResult";
import {RankingsService} from "../../services/rankings.service";
import {Subject} from "rxjs";

enum STATUS_STRINGS {
  'Registrati e inizia!',
  'Concludi match'
}

function sleep(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

@Component({
  selector: 'app-click-button',
  templateUrl: './click-button.component.html',
  styleUrls: ['./click-button.component.scss']
})
export class ClickButtonComponent implements OnInit {

  @Input() username: string = '';
  @Input() gameClosed: Subject<boolean> = new Subject<boolean>();
  @Output() results = new EventEmitter<IRankingsResult[]>();
  @Output() timer = new EventEmitter<number>();
  private status: number = 0;
  public statusString: string;
  @Output() countdownStarted = new EventEmitter<boolean>();
  private userId: string = '';
  private matchId: string = '';
  @Input() buttonDisabled = false;

  constructor(private userService: UserService, private matchService: MatchService, private rankingsService: RankingsService) {
    this.statusString = STATUS_STRINGS[0];
  }

  ngOnInit() {
    this.gameClosed.subscribe(v => {
      if(v) this.closeGame();
    })
  }

  public async buttonClick() {
    switch(this.status) {
      case 0: // if the user should register and then start the game..
      {
        this.userService.createUser(this.username).subscribe((data: {_id: string}) => {
          this.userId = data._id;

          this.buttonDisabled = true;
          this.countdownStarted.emit(true); // starts on the countdown

          this.matchService.createMatch(this.userId).subscribe((data: {_id: string, user: string, closed: boolean, createdAt: string}) => {
            this.matchId = data._id;

            this.status = 1;
            this.statusString = STATUS_STRINGS[1];

            this.timer.emit(30); // starts the timer
          });
        });
        break;
      }
      case 1: // if the user should end the match..
      {
        this.matchService.closeMatch(this.matchId).subscribe(() => { // close the match
          this.rankingsService.getUserRankings(this.userId).subscribe((data: IRankingsResult[]) => { // retrieves the rankings
            this.results.emit(data);
          })
        });
        break;
      }
    }
  }

  public async closeGame() {
    this.matchService.closeMatch(this.matchId).subscribe(() => { // close the match
      this.rankingsService.getUserRankings(this.userId).subscribe((data: IRankingsResult[]) => { // retrieves the rankings
        this.results.emit(data);
      })
    });
  }
}
