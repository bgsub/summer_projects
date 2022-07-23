import { Injectable } from '@angular/core';
//import { Cell } from '../classes/cell';
import { Snake } from '../classes/snake';
import * as canvasConstants from '../constants/canvas-constants';
import { Direction } from '../enums/directions';
import { Vector } from '../interfaces/vector';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  groundCtx!: CanvasRenderingContext2D;
 // units: Cell[];
  snake: Snake
  constructor() {
  //  this.units = [];
    this.snake = new Snake(this.groundCtx);
    console.log(this.snake.snakeBody[0].position);
    console.log(this.snake.snakeBody[2].position);
    console.log(this.snake.snakeBody[1].position);
  }

  /* to test the cells and the ground

  // initializeGround() {
  //   for (let i = 0; i < canvasConstants.UNIT_NUMBER; i++) {
  //     for (let j = 0; j < canvasConstants.UNIT_NUMBER; j++) {
  //       this.units.push(new Cell(i, j, this.groundCtx));
  //     }
  //   }
  //   for (const unit of this.units) {
  //     if (this.units.indexOf(unit) % 2 === 0) unit.isUnitOdd = true;
  //     unit.drawUnit();
  //   }

  // }
*/
  initializeSnake(){
    const snake = new Snake(this.groundCtx)
    this.snake = snake;
    for(const bodyPart of this.snake.snakeBody )
          this.snake.drawSnake(bodyPart);
    console.log(snake.snakeBody);
  }
 
   moveSnake(direction:Direction){

    this.snake.snakeMovement(direction, this.snake.headPosition);

  }
  getRandomPosition(): Vector{
    return {x: Math.floor(Math.random() * 17),y:Math.floor(Math.random() * 17)};
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}