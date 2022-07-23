import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Prey } from '../interfaces/prey';
import { CENTERING_PREY_LEFT, CENTERING_PREY_TOP, PREY_LEFT_POSITION_RATIO, PREY_SIZE, PREY_TOP_POSITION_RATIO, UNIT_HEIGHT, UNIT_WIDTH } from '../constants/canvas-constants';
import { GameService } from '../services/game.service';
import { Direction } from '../enums/directions';

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.component.html',
  styleUrls: ['./play-area.component.css']
})
export class PlayAreaComponent implements OnInit {
  @HostListener('window: keydown.ArrowRight') movingRight() {
    this.gameService.moveSnake(Direction.Right);
}
@HostListener('window: keydown.ArrowDown ') swappingRight() {
    this.gameService.moveSnake(Direction.Down);
}
  @ViewChild('groundCanvas',{static:true})
   private groundCanvas!: ElementRef<HTMLCanvasElement>;
   gamePrey : Prey = {topPosition: 0, leftPosition: 0, height: 0, width: 0} 
  constructor(private gameService: GameService) { 
    const preyPosition  =  this.gameService.getRandomPosition();
    const starting_prey : Prey = {topPosition: preyPosition.y *PREY_TOP_POSITION_RATIO + CENTERING_PREY_TOP,
    leftPosition:preyPosition.x *PREY_LEFT_POSITION_RATIO + CENTERING_PREY_LEFT,height:PREY_SIZE,width:PREY_SIZE}
    this.gamePrey =  starting_prey;
  }
 
  ngOnInit(): void {
  }
   ngAfterViewInit(): void {
    this.gameService.groundCtx = this.groundCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.gameService.initializeSnake();

    //this.gameService.initializeGround();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
    
}
