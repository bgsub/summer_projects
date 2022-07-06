import { TestBed } from '@angular/core/testing';
import { Vector } from '../interfaces/vector';
import { GroundService } from '../services/ground.service';
import { CanvasTestHelper } from './canvas-test-helper';
import { Prey } from './prey';

describe('Prey', () => {
  let groundService: GroundService;
  let ctxStub: CanvasRenderingContext2D;
  const mockPosition: Vector = { x: 0, y: 0 };
  const CANVAS_WIDTH = 500;
  const CANVAS_HEIGHT = 500;
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [{ provide: GroundService, useValue: groundService }],
    });
    ctxStub = CanvasTestHelper.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).getContext('2d') as CanvasRenderingContext2D;
    groundService = TestBed.inject(GroundService);
    groundService = new GroundService();
    groundService.groundCtx = ctxStub;
    groundService.initializeGround();
});
  it('should create an instance', () => {
    expect(new Prey(mockPosition.x,mockPosition.y,groundService.groundCtx)).toBeTruthy();
  });
});
