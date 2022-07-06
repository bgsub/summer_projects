import { Injectable } from '@angular/core';
import { Cell } from '../classes/cell';
import { Prey } from '../classes/prey';
import { Snake } from '../classes/snake';
import * as canvasConstants from '../constants/canvas-constants';
import { Vector } from '../interfaces/vector';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  groundCtx!: CanvasRenderingContext2D;
  units: Cell[];
  snake: Snake
  constructor() {
    this.units = [];
    this.snake = new Snake(this.groundCtx);
  }

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
  initializePrey(){
    const preyPosition = this.getRandomPosition();
    const prey  =  new Prey(preyPosition.x,preyPosition.y,this.groundCtx);    
    prey.drawPrey();

  }
  initializeSnake(){
    const snake = new Snake(this.groundCtx)
    snake.drawSnake();
  }
  getRandomPosition(): Vector{
    return {x: Math.floor(Math.random() * 17),y:Math.floor(Math.random() * 17)};
  }
}