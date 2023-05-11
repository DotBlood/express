import { Server } from "socket.io";
import { Express } from 'express'
import http from "http";
import { log } from "./app/core/Logger/Logger";

export class WebSoket {
    io: Server;
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

    constructor(app: Express) {
        this.server = http.createServer(app)
        this.io = new Server(this.server)
    }

    public SConnect(Port: number) {
        // this.ioConnect()
        return this.server.listen(Port)
    }

    get getIo() {
        return this.io
    }

    private ioConnect() {
        return this.io.on('connection', (socket) => {
            log.info('a user connected')
        })
    }


}