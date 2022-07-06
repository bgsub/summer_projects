import { Vector } from "../interfaces/vector";
import * as canvasConstants from '../constants/canvas-constants'


export class Prey {
    preyPosition : Vector;
    preyContext: CanvasRenderingContext2D
    constructor(posX:number, posY:number,ctx: CanvasRenderingContext2D){
        this.preyPosition = {x:posX,y:posY};
        this.preyContext = ctx;
     }

     drawPrey(){
        this.preyContext.strokeRect(
            this.preyPosition.x * canvasConstants.UNIT_WIDTH+13,
            this.preyPosition.y * canvasConstants.UNIT_HEIGHT+7,
            canvasConstants.PREY_SIZE,
            canvasConstants.PREY_SIZE
        )
        this.preyContext.fillStyle = 'red';
        this.preyContext.strokeStyle = '#000000';
        this.preyContext.lineWidth = 10;
        this.preyContext.fillRect(
            this.preyPosition.x * canvasConstants.UNIT_WIDTH+13 ,
            this.preyPosition.y * canvasConstants.UNIT_HEIGHT+7,
            canvasConstants.PREY_SIZE ,
            canvasConstants.PREY_SIZE,
        ); 

     }
}
