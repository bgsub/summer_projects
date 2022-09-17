import * as http from 'http';
import * as io from 'socket.io' ;
export class SocketManager {
private sio: io.Server;

constructor(server: http.Server) {
    this.sio = new io.Server(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });
}
handleSockets(): void {
    this.sio.on('connection', (socket) => {
        socket.on('gameInfos', (arg) => {
            console.log(arg);
         });
        socket.on('disconnect', () => {
           console.log('left');
        });
    });
}
}