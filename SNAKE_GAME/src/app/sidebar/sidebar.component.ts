import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  score:number
  constructor(private gameService:GameService) 
  { 
    this.score=gameService.score;
  }

  ngOnInit(): void {
  }
  getScore(){
    return this.gameService.score;
  }

}
