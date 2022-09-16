import { Component, ElementRef, HostListener, OnInit, ViewChild ,DoCheck} from '@angular/core';
import { GameService } from '../services/game.service';
import { Direction } from '../enums/directions';
import { Prey } from '../interfaces/prey';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.component.html',
  styleUrls: ['./play-area.component.css']
})
export class PlayAreaComponent implements OnInit {
  @HostListener('window: keydown.ArrowRight') movingRight() {
    
    this.gameService.changeDirection(Direction.Right);
    this.startGame();
}
@HostListener('window: keydown.ArrowDown ') movingDown() {
    this.gameService.changeDirection(Direction.Down);
    this.startGame();
}
@HostListener('window: keydown.ArrowLeft ') movingLeft() {
  this.gameService.changeDirection(Direction.Left);
   this.startGame();
}
@HostListener('window: keydown.ArrowUp ') movingUp() {
  this.gameService.changeDirection(Direction.Up);
  this.startGame();
}
gamePrey: Prey;
displayBox = false;
score=0;
  @ViewChild('groundCanvas',{static:true})
   private groundCanvas!: ElementRef<HTMLCanvasElement>;
  
  constructor( public router: Router,private gameService: GameService) { 
    this.gamePrey = gameService.prey;
  
  }
 
  ngOnInit(): void {
    
  }
  ngDoCheck(): void{
    this.gamePrey = this.gameService.prey;
    this.displayBox = this.gameService.snakeIsDead;
    this.score = this.gameService.score;

  }
   ngAfterViewInit(): void {
    this.gameService.groundCtx = this.groundCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;    
    this.gameService.initializeSnake();
  }
  startGame(){
    if(!this.gameService.gameStarted) this.gameService.play();
  else return;
  this.gameService.gameStarted = true
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
restartGame(){
this.gameService.restartGame()

}
goToHomePage(){
  this.router.navigate(['/home-page']);
}
    
}
