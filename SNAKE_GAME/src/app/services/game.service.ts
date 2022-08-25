import { Injectable } from '@angular/core';
import { Cell } from '../classes/cell';
import { Snake } from '../classes/snake';
import * as canvasConstants from '../constants/canvas-constants';
import { Direction } from '../enums/directions';
import { CENTERING_PREY_FACTOR,PREY_SIZE, PREY_POSITION_RATIO, UNIT_HEIGHT, UNIT_WIDTH, PREY_TEST_POSITION } from '../constants/canvas-constants';
import { Prey } from '../interfaces/prey';
import { Vector } from '../interfaces/vector';
import { DEFAULT_DURATION, UNDEFINED_POSITION } from '../constants/general-constants';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  groundCtx!: CanvasRenderingContext2D;
  units: Cell[];
  snake: Snake
  gameStarted: boolean;
  gameInterval:number;
  gameDuration: number;
  prey : Prey; 
  preyPosition: Vector;
  boundaryCollision:boolean;
  constructor() {
   this.units = [];
   this.prey  = {topPosition: 0, leftPosition: 0, height: 0, width: 0}
    this.snake = new Snake(this.groundCtx);
    this.gameStarted = false;
    this.gameInterval=0;
    this.boundaryCollision = false;
    this.gameDuration = DEFAULT_DURATION;
    this.preyPosition  =  this.getRandomPosition();
    this.prey =  this.createAPrey(this.preyPosition);
    //this.prey =  this.createAPrey(canvasConstants.PREY_TEST_POSITION);
  }

  /* to test the cells and the ground*/

  initializeGround() {
    for (let i = 0; i < canvasConstants.UNIT_NUMBER; i++) {
      for (let j = 0; j < canvasConstants.UNIT_NUMBER; j++) {
        this.units.push(new Cell(i, j, this.groundCtx));
      }
    }
    for (const unit of this.units) {
      if (this.units.indexOf(unit) % 2 === 0) unit.isUnitOdd = true;
      unit.drawUnit();
    }

  }
  resetGame(){
     this.snake.resetSnake();
     this.gameStarted = false;
     this.gameInterval=0;
     this.boundaryCollision = false;
     this.gameDuration = DEFAULT_DURATION;
     this.preyPosition = UNDEFINED_POSITION;
     

  }
  createAPrey(position: Vector) {
    const createdPrey : Prey = {topPosition: position.y *PREY_POSITION_RATIO + CENTERING_PREY_FACTOR ,
      leftPosition:position.x *PREY_POSITION_RATIO + CENTERING_PREY_FACTOR,height:PREY_SIZE,width:PREY_SIZE};
      return createdPrey; 
  }

  initializeSnake(){
    const snake = new Snake(this.groundCtx)
    this.snake = snake;
    this.snake.drawSnake();
  }
   
  changeDirection(direction : Direction) {
    this.snake.changeSnakeDirection(direction);
  }
  checkBoundaryCollision(){
    return (this.snake.headPosition.x < 0 || 
      this.snake.headPosition.y < 0||
      this.snake.headPosition.x >  canvasConstants.UNIT_NUMBER-1 || 
      this.snake.headPosition.y > canvasConstants.UNIT_NUMBER-1);
    
  }
  checkSelfCollision(){
    let selfCol = false;
   for(const bodyPart of this.snake.snakeTail)
     {
          if(this.snake.headPosition.x === bodyPart.x &&this.snake.headPosition.y === bodyPart.y)
          selfCol = true;
     }
     return selfCol;
    
  }
 
  huntPrey(){
  
    if(this.snake.headPosition.x === this.preyPosition.x && 
      this.snake.headPosition.y === this.preyPosition.y){
        this.preyPosition = this.getRandomPosition()
        this.prey  = this.createAPrey(this.preyPosition);
        this.snake.addPartOnTail(this.snake.lastPartOfTheTail);
      }
  }
  snakeIsDead(){
    return (this.checkBoundaryCollision()|| this.checkSelfCollision());

  }
  
   play(){
    this.gameInterval = window.setInterval(() => {
    this.groundCtx.clearRect(0,0,canvasConstants.GROUND_WIDTH,canvasConstants.GROUND_HEIGHT); 
    this.snake.moveSnake();
    this.snake.drawSnake();
    this.huntPrey();
    if(this.checkBoundaryCollision()) {
      clearInterval(this.gameInterval);
      this.snake.collisionEffect();
      this.snake.drawDeadSnakeHead();

    };
    if(this.checkSelfCollision()) {
      clearInterval(this.gameInterval);
      this.snake.drawDeadSnakeHead();
    };

   },DEFAULT_DURATION)

  }
  getRandomPosition(): Vector{
    return {x: Math.floor(Math.random() * canvasConstants.UNIT_NUMBER),y:Math.floor(Math.random() * canvasConstants.UNIT_NUMBER)};
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}