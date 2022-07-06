import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GroundService } from '../services/ground.service';

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.component.html',
  styleUrls: ['./play-area.component.css']
})
export class PlayAreaComponent implements OnInit {
  
  @ViewChild('groundCanvas',{static:true})
   private groundCanvas!: ElementRef<HTMLCanvasElement>;
  
  constructor(private groundService: GroundService) { }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.groundService.groundCtx = this.groundCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.groundService.initializeGround();
    console.log(this.groundService.units)
  }

}