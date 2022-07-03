import { Vector } from "../interfaces/vector";
import * as canvasConstants from '../constants/canvas-constants'

export class Unit {
     unitPosition: Vector;
     occupied: boolean;
     context: CanvasRenderingContext2D;
     isUnitOdd: boolean;
     constructor(posX:number, posY:number,ctx: CanvasRenderingContext2D){
        this.unitPosition = {x:posX,y:posY};
        this.context = ctx;
        this.occupied=false;
        this.isUnitOdd = false;
        

     }
     drawUnit(){
        this.context.strokeRect(
            this.unitPosition.x * canvasConstants.UNIT_WIDTH,
            this.unitPosition.y * canvasConstants.UNIT_HEIGHT,
            canvasConstants.UNIT_WIDTH,
            canvasConstants.UNIT_HEIGHT
        )
        if(this.isUnitOdd)
        {
        this.context.fillStyle = 'white';
        }
        else this.context.fillStyle = 'grey'
        this.context.strokeStyle = '#000000';
        this.context.lineWidth = 2;
        this.context.fillRect(
            this.unitPosition.x * canvasConstants.UNIT_WIDTH + this.context.lineWidth - 1,
            this.unitPosition.y * canvasConstants.UNIT_HEIGHT + this.context.lineWidth - 1,
            canvasConstants.UNIT_WIDTH - this.context.lineWidth,
            canvasConstants.UNIT_HEIGHT - this.context.lineWidth,
        ); 
    }
  

}

