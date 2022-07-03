import { Injectable } from '@angular/core';
import { Unit } from '../classes/unit';
import * as canvasConstants from '../constants/canvas-constants';

@Injectable({
  providedIn: 'root',
})
export class GroundService {
  groundCtx!: CanvasRenderingContext2D;
  units: Unit[];
  constructor() {
    this.units = [];
  }

  initializeGround() {
    for (let i = 0; i < canvasConstants.UNIT_NUMBER; i++) {
      for (let j = 0; j < canvasConstants.UNIT_NUMBER; j++) {
        this.units.push(new Unit(i, j, this.groundCtx));
      }
    }
    for (const unit of this.units) {
      if (this.units.indexOf(unit) % 2 === 0) unit.isUnitOdd = true;
      unit.drawUnit();
    }
  }
}
