import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Prey } from '../interfaces/prey';
import { CENTERING_PREY_FACTOR,PREY_SIZE, PREY_POSITION_RATIO, UNIT_HEIGHT, UNIT_WIDTH, PREY_TEST_POSITION } from '../constants/canvas-constants';
import { GameService } from '../services/game.service';
import { Direction } from '../enums/directions';

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
  @ViewChild('groundCanvas',{static:true})
   private groundCanvas!: ElementRef<HTMLCanvasElement>;
   gamePrey : Prey = {topPosition: 0, leftPosition: 0, height: 0, width: 0} 
  constructor(private gameService: GameService) { 
    const preyPosition  =  this.gameService.getRandomPosition();
    const starting_prey : Prey = {topPosition: PREY_TEST_POSITION.y *PREY_POSITION_RATIO + CENTERING_PREY_FACTOR ,
      leftPosition:PREY_TEST_POSITION.x *PREY_POSITION_RATIO + CENTERING_PREY_FACTOR,height:PREY_SIZE,width:PREY_SIZE}
    // const starting_prey : Prey = {topPosition: preyPosition.y *PREY_POSITION_RATIO + CENTERING_PREY_FACTOR ,
    // leftPosition:preyPosition.x *PREY_POSITION_RATIO + CENTERING_PREY_FACTOR,height:PREY_SIZE,width:PREY_SIZE}
    this.gamePrey =  starting_prey;
    console.log(preyPosition);
  }
 
  ngOnInit(): void {
  }
   ngAfterViewInit(): void {
    this.gameService.groundCtx = this.groundCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
 
    this.gameService.initializeGround();
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
    
}
