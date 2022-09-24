import * as http from 'http';
import * as io from 'socket.io' ;
import { DatabaseService } from './database.service';

export class SocketManager {
private sio: io.Server;

constructor(server: http.Server,public databaseService : DatabaseService) {
    this.sio = new io.Server(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });
}
handleSockets(): void {
    this.sio.on('connection', (socket) => {
        
        socket.on('addScore', async (infos) => {
            this.databaseService.addScore({playerName:infos.playerName, score:infos.score});
            await this.databaseService.updateScores();
         });
         socket.on('getBestScores',async ()=>{
            await this.databaseService.updateScores();
            const scoreArg = JSON.stringify(this.databaseService.scores);
            socket.emit('displayBestScores',(scoreArg));

         })
        socket.on('disconnect', () => {
            //do nothing for now
        });
    });
}
}