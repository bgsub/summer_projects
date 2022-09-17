import { AfterViewInit, Component, DoCheck} from '@angular/core';
import { Router } from '@angular/router';
import { Scores } from '../interfaces/Scores';
import { GameService } from '../services/game.service';
import { SocketsClientHandlerService } from '../services/sockets-client-handler.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements AfterViewInit{
  title = 'SNAKE GAME';
  playerName = ''
  displayBoxInfo = false
  displayBestScores = false;
  bestScores : Scores[];
  
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(  public router: Router,
    private socketHandler: SocketsClientHandlerService, 
    private gameService: GameService) {
      this.bestScores = [];
     
   }
  ngAfterViewInit(): void {
    this.socketHandler.connect();
    this.socketHandler.on('displayBestScores',(scoreArg:string)=>{
      this.bestScores = JSON.parse(scoreArg);
    })
    
  }
 
gotToGame(){
  this.gameService.playerName = this.playerName;
  // save the name in a local storage for when player wanna restart
  localStorage.setItem('name', this.gameService.playerName!);
  this.router.navigate(['/game-page']);
  this.socketHandler.disconnect();
}
showBestScores(){
  this.socketHandler.send('getBestScores');
  this.displayBestScores = true;
}
closeBestScoresPop() {
  this.displayBestScores= false;
}
}
