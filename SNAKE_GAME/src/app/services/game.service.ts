import { Injectable } from '@angular/core';
import { Cell } from '../classes/cell';
import { Snake } from '../classes/snake';
import * as canvasConstants from '../constants/canvas-constants';
import { Direction } from '../enums/directions';
import { Vector } from '../interfaces/vector';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  groundCtx!: CanvasRenderingContext2D;
  units: Cell[];
  snake: Snake
  gameStarted: boolean;
  boundaryCollision:boolean;
  constructor() {
   this.units = [];
    this.snake = new Snake(this.groundCtx);
    this.gameStarted = false;
    this.boundaryCollision = false;
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

  initializeSnake(){
    const snake = new Snake(this.groundCtx)
    this.snake = snake;
    this.snake.drawSnake();
    console.log(snake.snakeTail);
  }
   
  changeDirection(direction : Direction) {
    this.snake.changeSnakeDirection(direction);
  }
  checkBoundaryCollision(){
    return (this.snake.headPosition.x ===0 || 
      this.snake.headPosition.y === 0||
      this.snake.headPosition.x === canvasConstants.UNIT_NUMBER-1 || 
      this.snake.headPosition.y === canvasConstants.UNIT_NUMBER-1);
    
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
  
   play(){
   const gameInterval = window.setInterval(() => {
    this.groundCtx.clearRect(0,0,canvasConstants.GROUND_WIDTH,canvasConstants.GROUND_HEIGHT); 
    this.snake.moveSnake();
    this.snake.drawSnake();
    if(this.checkBoundaryCollision()|| this.checkSelfCollision()) {clearInterval(gameInterval);
      this.snake.drawDeadSnakeHead();

    };
  // console.log(this.snake.headPosition);

   },70)

  }
  getRandomPosition(): Vector{
    return {x: Math.floor(Math.random() * canvasConstants.UNIT_NUMBER),y:Math.floor(Math.random() * canvasConstants.UNIT_NUMBER)};
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}