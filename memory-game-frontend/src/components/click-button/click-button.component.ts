import { Component, Input } from '@angular/core';
import {UserService} from "../../services/user.service";
import {MatchService} from "../../services/match.service";

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
  private status: number = 0;
  public statusString: string;
  private userId: string = '';
  private matchId: string = '';

  constructor(private userService: UserService, private matchService: MatchService) {
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
          console.log(data._id);
          this.matchId = data._id;

          this.status = 2;
          this.statusString = STATUS_STRINGS[2];
        });
        break;
      }
      case 2: // if the user should end the match..
      {
        this.matchService.closeMatch(this.matchId).subscribe(() => {
          window.location.href = `http://localhost:4000/rankings/${this.userId}`;
        })
        break;
      }
    }
  }
}
