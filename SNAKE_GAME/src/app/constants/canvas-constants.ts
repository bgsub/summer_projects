import { Vector } from "../interfaces/vector";

export const  GROUND_WIDTH = 950;
export const GROUND_HEIGHT = 750;
export const UNIT_NUMBER = 17;
export const UNIT_WIDTH= GROUND_WIDTH/UNIT_NUMBER;
export const UNIT_HEIGHT = GROUND_HEIGHT/UNIT_NUMBER;
export const PREY_SIZE = 2*UNIT_HEIGHT/3;
export const SNAKE_WIDTH = UNIT_WIDTH-25;
export const GROUND_CENTER : Vector =  {x:8,y:8};
export const PREY_TOP_POSITION_RATIO= GROUND_HEIGHT / UNIT_NUMBER;
export const PREY_LEFT_POSITION_RATIO= GROUND_WIDTH / UNIT_NUMBER;
export const CENTERING_PREY_TOP = 7;
export const CENTERING_PREY_LEFT = 13; 
export const SNAKE_SPEED =  0.01;
export const PART_SNAKE_UNIT = SNAKE_WIDTH/17;
export const HALF_PART_SNAKE_UNIT = PART_SNAKE_UNIT/2;