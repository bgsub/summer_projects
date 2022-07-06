import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.component.html',
  styleUrls: ['./play-area.component.css']
})
export class PlayAreaComponent implements OnInit {
  
  @ViewChild('groundCanvas',{static:true})
   private groundCanvas!: ElementRef<HTMLCanvasElement>;
  
  constructor(private gameService: GameService) { }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.gameService.groundCtx = this.groundCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.gameService.initializeGround();
    this.gameService.initializePrey();
    this.gameService.initializeSnake();
  }

}
