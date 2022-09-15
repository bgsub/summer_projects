import { Vector } from "../interfaces/vector";

export const  GROUND_WIDTH = 600;
export const GROUND_HEIGHT = 600;
export const UNIT_NUMBER = 32;
export const UNIT_WIDTH= GROUND_WIDTH/UNIT_NUMBER;
export const UNIT_HEIGHT = GROUND_HEIGHT/UNIT_NUMBER;
export const PREY_SIZE = 2*UNIT_HEIGHT/3;
export const SNAKE_WIDTH = UNIT_WIDTH;
export const GROUND_CENTER : Vector =  {x:15,y:15};
export const SNAKE_TEST_POSITION : Vector =  {x:29,y:15};
export const PREY_POSITION_RATIO= UNIT_WIDTH;
export const PREY_TEST_POSITION: Vector =  {x:15,y:15}
export const CENTERING_PREY_FACTOR = UNIT_WIDTH/5;
export const PART_SNAKE_UNIT = SNAKE_WIDTH/17;
export const HALF_PART_SNAKE_UNIT = PART_SNAKE_UNIT/2;
export const SPEED_SCALE =  1;