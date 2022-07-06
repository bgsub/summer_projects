import { Vector } from "../interfaces/vector";

export const  GROUND_WIDTH = 950;
export const GROUND_HEIGHT = 750;
export const UNIT_NUMBER = 17;
export const UNIT_WIDTH= GROUND_WIDTH/UNIT_NUMBER;
export const UNIT_HEIGHT = GROUND_HEIGHT/UNIT_NUMBER;
export const PREY_SIZE = 2*UNIT_HEIGHT/3;
export const SNAKE_WIDTH = UNIT_WIDTH-25;
export const GROUND_CENTER : Vector =  {x:8,y:8};