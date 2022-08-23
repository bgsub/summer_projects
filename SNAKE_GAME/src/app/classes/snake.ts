import { Vector } from "../interfaces/vector";
import * as canvasConstants from '../constants/canvas-constants'
//import { snakeTailPart } from "../interfaces/snakeTailPart";
import { Direction } from "../enums/directions";
export class Snake {
    headPosition: Vector;
    snakeTail: Vector[] =[];
    snakeContext : CanvasRenderingContext2D;
    direction: Direction;
    verticalSpeed = 0;
    horizontalSpeed = 0;

    constructor(ctx: CanvasRenderingContext2D){
        this.snakeContext = ctx;
        this.headPosition =  canvasConstants.GROUND_CENTER;
        this.direction = Direction.Right;
        let posX=this.headPosition.x;
        const bodyPart : Vector = { x:posX-1 ,y:this.headPosition.y};
        this.snakeTail.push(bodyPart); 
   
    }
    
    drawSnakeHead(){
        this.snakeContext.fillStyle = 'cyan';
        this.snakeContext.fillRect(
            this.headPosition.x * canvasConstants.UNIT_WIDTH ,
            this.headPosition.y * canvasConstants.UNIT_HEIGHT,
            canvasConstants.SNAKE_WIDTH,
            canvasConstants.SNAKE_WIDTH
        ) 
    }
    drawDeadSnakeHead(){
        this.snakeContext.fillStyle = 'red';
        this.snakeContext.fillRect(
            this.headPosition.x * canvasConstants.UNIT_WIDTH ,
            this.headPosition.y * canvasConstants.UNIT_HEIGHT,
            canvasConstants.SNAKE_WIDTH,
            canvasConstants.SNAKE_WIDTH
        ) 
    }
    drawTail()
    {
        for(const bodyPart of this.snakeTail){
        this.snakeContext.fillStyle = 'black'; 
        this.snakeContext.fillRect(
            bodyPart.x * canvasConstants.UNIT_WIDTH ,
            bodyPart.y * canvasConstants.UNIT_HEIGHT,
            canvasConstants.SNAKE_WIDTH,
            canvasConstants.SNAKE_WIDTH
        ) 
        }
    }

     drawSnake(){
        this.drawSnakeHead();
        this.drawTail();
         
    }
    changeSnakeDirection(directionToGo:Direction)
    {
        let prevDirection = this.direction
        console.log(prevDirection.toFixed() + ' ' + directionToGo + ' ');
        switch(directionToGo) {
            case Direction.Right: 
             if(prevDirection !== Direction.Left){
                this.direction= directionToGo;
                this.horizontalSpeed = canvasConstants.SPEED_SCALE;
                this.verticalSpeed = 0;
             }
             break;
             case Direction.Left: 
             if(prevDirection !== Direction.Right){
                this.direction= directionToGo;
                this.horizontalSpeed = -canvasConstants.SPEED_SCALE;
                this.verticalSpeed = 0;
             }
             break;
             case Direction.Up: 
             if(prevDirection !== Direction.Down){
                this.direction= directionToGo;
                this.horizontalSpeed = 0;
                this.verticalSpeed = -canvasConstants.SPEED_SCALE;
             }
             break;
             case Direction.Down: 
             if(prevDirection !== Direction.Up){
                this.direction= directionToGo;
                this.horizontalSpeed = 0;
                this.verticalSpeed = canvasConstants.SPEED_SCALE;
             }
             break;
             
             
        }
    }

    moveSnake(){
        for(let i = 0; i < this.snakeTail.length-1;i++){
            this.snakeTail[i]= this.snakeTail[i+1]
        
        }
       this.snakeTail[this.snakeTail.length -1 ] = {x:this.headPosition.x, y:this.headPosition.y}
       this.headPosition.x += this.horizontalSpeed;
       this.headPosition.y += this.verticalSpeed;
    }
     comparePosition(position1: Vector, position2: Vector) : boolean
    {
          return  Math.ceil(position1.x) === Math.ceil(position2.x) && Math.ceil(position1.y) ===Math.ceil(position2.y) 
         
    }
}

