import { Vector } from "../interfaces/vector";
import * as canvasConstants from '../constants/canvas-constants'
import { SnakeBodyPart } from "../interfaces/snakeBodyPart";
import { Direction } from "../enums/directions";

let rightAnimationId = 0;
let topAnimationId = 0;
export class Snake {
    headPosition: Vector;
    snakeBody: SnakeBodyPart[] =[];
    snakeSpeed: number;
    snakeContext : CanvasRenderingContext2D;
    constructor(ctx: CanvasRenderingContext2D){
        this.snakeContext = ctx;
        this.headPosition =  canvasConstants.GROUND_CENTER;
        this.snakeSpeed=0;
        this.snakeBody.push({ position: this.headPosition, direction: Direction.Right});
        let posX=this.headPosition.x;
        while(this.snakeBody.length<3){
            const bodyPart : SnakeBodyPart = {position:{x:posX-1,y:this.headPosition.y},direction: Direction.Right}
            this.snakeBody.push(bodyPart);
            posX-=1;
            console.log(posX);
        }    
    }
    

    

   
    drawSnake(bodyPart:SnakeBodyPart){
       
         if(bodyPart.position ===this.headPosition) 
             this.snakeContext.fillStyle = 'cyan';
             else  this.snakeContext.fillStyle = 'black';
          this.drawBodyParts(bodyPart);
       
     
    }

    horizontalDrawing(bodyPart:SnakeBodyPart){
        this.snakeContext.fillRect(
            bodyPart.position.x * canvasConstants.UNIT_WIDTH ,
            bodyPart.position.y * canvasConstants.UNIT_HEIGHT+8,
            canvasConstants.UNIT_WIDTH,
            canvasConstants.SNAKE_WIDTH
        ) 

    }
    verticalDrawing(bodyPart:SnakeBodyPart)
    {
        this.snakeContext.fillRect(
            bodyPart.position.x * canvasConstants.UNIT_WIDTH ,
            bodyPart.position.y * canvasConstants.UNIT_HEIGHT+8,
            canvasConstants.SNAKE_WIDTH,
            canvasConstants.UNIT_WIDTH
        ) 
    }

     drawBodyParts(bodyPart:SnakeBodyPart){
          switch (bodyPart.direction){
            case Direction.Right: 

                this.horizontalDrawing(bodyPart)
                break;
          
            case Direction.Left: 

                this.horizontalDrawing(bodyPart);
                break;
      
            case Direction.Up: 

                 this.verticalDrawing(bodyPart)
                break;
 
            case Direction.Down: 

                this.verticalDrawing(bodyPart);
                 break;

     }
    }

    movingRight(turningPoint:Vector, bodyPart:SnakeBodyPart) {
       
        this.snakeContext.clearRect(0,0,canvasConstants.GROUND_WIDTH,canvasConstants.GROUND_HEIGHT); 
          rightAnimationId = requestAnimationFrame(()=>this.movingRight(turningPoint,bodyPart));
             bodyPart.position.x+= canvasConstants.SNAKE_SPEED;
          for(const bP of this.snakeBody)
                this.drawSnake(bP);
         
                if(bodyPart.direction !==Direction.Right) cancelAnimationFrame(rightAnimationId);
   
    }
  
    movingDown(turningPoint:Vector,bodyPart:SnakeBodyPart) {

        topAnimationId = requestAnimationFrame(()=>this.movingDown(turningPoint,bodyPart));
       this.snakeContext.clearRect(0,0,canvasConstants.GROUND_WIDTH,canvasConstants.GROUND_HEIGHT);
             bodyPart.position.y+= canvasConstants.SNAKE_SPEED;
             for(const bP of this.snakeBody)
                this.drawSnake(bP);
                if(bodyPart.direction!== Direction.Down) cancelAnimationFrame(topAnimationId)
   
    }
    snakeMovement(direction: Direction, turningPoint:Vector){
        
        for(const bodyPart of this.snakeBody){
         
           if(bodyPart.direction ===Direction.Right) this.movingRight(turningPoint,bodyPart);
            if(bodyPart.direction ===Direction.Down) this.movingDown(turningPoint,bodyPart);
            if(this.comparePosition(bodyPart.position,turningPoint)) bodyPart.direction = direction;
        }

    }
     comparePosition(position1: Vector, position2: Vector) : boolean
    {
          return  Math.ceil(position1.x) === Math.ceil(position2.x) && Math.ceil(position1.y) ===Math.ceil(position2.y) 
         
    }
}
