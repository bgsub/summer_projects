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
    lastSnakeStateSaved : Vector[];

    constructor(ctx: CanvasRenderingContext2D){
        this.snakeContext = ctx;
        this.headPosition =  canvasConstants.GROUND_CENTER;
        this.direction = Direction.Right;
        const bodyPart : Vector = { x:this.headPosition.x-1 ,y:this.headPosition.y};
        this.snakeTail.push(bodyPart); 
        this.lastSnakeStateSaved = [];
   
    }
    resetSnake(){
        this.snakeContext.clearRect(0,0,canvasConstants.GROUND_WIDTH,canvasConstants.GROUND_HEIGHT);
        this.headPosition = canvasConstants.GROUND_CENTER;
        this.direction=Direction.Right;
        const bodyPart : Vector = { x:this.headPosition.x-1 ,y:this.headPosition.y};
        this.snakeTail.push(bodyPart); 
        this.lastSnakeStateSaved = [];
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
    saveState(){

        const  snakeState : Vector[] = [];
        snakeState.push({x:this.headPosition.x,y:this.headPosition.y});

        for(const tailPart of this.snakeTail) 
           snakeState.push(tailPart); 
        this.lastSnakeStateSaved = snakeState;       
    }
      
     drawSnake(){
        this.drawSnakeHead();
        this.drawTail();
        
        
    }
    changeSnakeDirection(directionToGo:Direction)
    {
        const  prevDirection = this.direction
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
    get lastPartOfTheTail()
    {
        return this.snakeTail[this.snakeTail.length-1];
    }
    
    addPartOnTail(position:Vector){
        const  newPart : Vector = {x: position.x,y:position.y};
        this.snakeTail.push(newPart);

     }
    collisionEffect()
    {
       
        this.snakeContext.clearRect(0,0,canvasConstants.GROUND_WIDTH,canvasConstants.GROUND_HEIGHT); 
        this.headPosition = this.lastSnakeStateSaved[0];
        this.snakeTail = this.lastSnakeStateSaved.slice(1,this.lastSnakeStateSaved.length)
        this.drawSnake();
    }
    moveSnake(){
        for(let i = 0; i < this.snakeTail.length-1;i++){
            this.snakeTail[i]= this.snakeTail[i+1]
        
        }
       this.snakeTail[this.snakeTail.length -1 ] = {x:this.headPosition.x, y:this.headPosition.y}
       this.headPosition.x += this.horizontalSpeed;
       this.headPosition.y += this.verticalSpeed;
       if(this.headPosition.x === 0 || 
        this.headPosition.y === 0||
        this.headPosition.x ===  canvasConstants.UNIT_NUMBER-1 || 
        this.headPosition.y === canvasConstants.UNIT_NUMBER-1)
        this.saveState();
    }
     comparePosition(position1: Vector, position2: Vector) : boolean
    {
          return  Math.ceil(position1.x) === Math.ceil(position2.x) && Math.ceil(position1.y) ===Math.ceil(position2.y) 
         
    }
}

