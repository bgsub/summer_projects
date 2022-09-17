import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { SocketsClientHandlerService } from '../services/sockets-client-handler.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{
  title = 'SNAKE GAME';
  playerName = ''
  displayBoxInfo = false
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(  public router: Router,
    private socketHandler: SocketsClientHandlerService, 
    private gameService: GameService) {
     
   }
  ngOnInit(): void {
    this.socketHandler.connect();
    this.socketBehaviorTest();
}
socketBehaviorTest(){
  this.socketHandler.socket.on("connect",()=>{
    console.log('hi');
    this.socketHandler.socket.emit("helloBack","hello");

  });
}
 
gotToGame(){
  this.gameService.playerName = this.playerName;
  localStorage.setItem('name', this.gameService.playerName!);
  this.router.navigate(['/game-page']);
}
}
