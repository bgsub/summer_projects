import { Vector } from "../interfaces/vector";
import * as canvasConstants from '../constants/canvas-constants'

export class Snake {
    headPosition: Vector;
    snakeBody: Vector[] =[];
    snakeSize: number;
    snakeContext : CanvasRenderingContext2D;
    constructor(ctx: CanvasRenderingContext2D){
        this.snakeContext = ctx;
        this.headPosition =  canvasConstants.GROUND_CENTER;
        this.snakeBody.push(this.headPosition);
        let posX=this.headPosition.x;
        while(this.snakeBody.length<3){
            this.snakeBody.push({x:posX-1,y:this.headPosition.y})
            posX-=1;
        } 
        this.snakeSize = this.snakeBody.length;     
    }

   
    drawSnake(){
       
        for(const bodyPart of this.snakeBody)
        {
            if(bodyPart ===this.headPosition) 
             this.snakeContext.fillStyle = 'cyan';
             else  this.snakeContext.fillStyle = 'black';
        this.snakeContext.fillRect(
            bodyPart.x * canvasConstants.UNIT_WIDTH ,
            bodyPart.y * canvasConstants.UNIT_HEIGHT+8,
            canvasConstants.UNIT_WIDTH,
            canvasConstants.SNAKE_WIDTH
        )
       
     }
    }

}
