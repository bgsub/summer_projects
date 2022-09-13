import { Component} from '@angular/core';
import { SocketsClientHandlerService } from '../services/sockets-client-handler.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent{
  title = 'SNAKE GAME';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private socketHandler: SocketsClientHandlerService) {
    if (!this.socketHandler.isSocketAlive()) {
      this.socketHandler.connect();
  }

   }

}
