import { Vector } from "../interfaces/vector";
import * as canvasConstants from '../constants/canvas-constants'

export class Cell {
     unitPosition: Vector;
     occupied: boolean;
     unitContext: CanvasRenderingContext2D;
     isUnitOdd: boolean;
     constructor(posX:number, posY:number,ctx: CanvasRenderingContext2D){
        this.unitPosition = {x:posX,y:posY};
        this.unitContext = ctx;
        this.occupied=false;
        this.isUnitOdd = false;
        

     }
     drawUnit(){
        this.unitContext.strokeRect(
            this.unitPosition.x * canvasConstants.UNIT_WIDTH,
            this.unitPosition.y * canvasConstants.UNIT_HEIGHT,
            canvasConstants.UNIT_WIDTH,
            canvasConstants.UNIT_HEIGHT
        )
        if(this.isUnitOdd)
        {
        this.unitContext.fillStyle = 'white';
        }
        else this.unitContext.fillStyle = 'grey'
        this.unitContext.strokeStyle = '#000000';
        this.unitContext.lineWidth = 2;
        this.unitContext.fillRect(
            this.unitPosition.x * canvasConstants.UNIT_WIDTH + this.unitContext.lineWidth - 1,
            this.unitPosition.y * canvasConstants.UNIT_HEIGHT + this.unitContext.lineWidth - 1,
            canvasConstants.UNIT_WIDTH - this.unitContext.lineWidth,
            canvasConstants.UNIT_HEIGHT - this.unitContext.lineWidth,
        ); 
    }
  

}

