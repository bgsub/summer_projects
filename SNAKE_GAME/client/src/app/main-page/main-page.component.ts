import { Component, OnInit} from '@angular/core';
import { SocketsClientHandlerService } from '../services/sockets-client-handler.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{
  title = 'SNAKE GAME';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private socketHandler: SocketsClientHandlerService) {

   }
  ngOnInit(): void {
    this.socketHandler.connect();
    this.socketBehaviorTest();
}
 socketBehaviorTest(){
  this.socketHandler.socket.on("connect",()=>{
    console.log('hi');
    this.socketHandler.socket.emit("helloBack","hello");

  });
  
}
}
