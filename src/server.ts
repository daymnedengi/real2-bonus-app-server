import { WebSocket, WebSocketServer } from "ws";
import { SocketMessage } from "./socketAPITypes";

export interface Client extends WebSocket {
    remoteAddress?: string;
}

type SocketMessageListener = (client: Client, message: SocketMessage) => void;

export class Server extends WebSocketServer {
    private incomingMessageListeners: SocketMessageListener[];
    private outcomingMessageListeners: SocketMessageListener[];

    constructor(port: number) {
        super({ port: port });

        this.incomingMessageListeners = [];
        this.outcomingMessageListeners = [];

        this.on("listening", () => {
            console.log(`Сервер запущен на ${port} порте.`);
        });

        this.on("connection", (connection, request) => {
            const client: Client = connection;
            client.remoteAddress = request.socket.remoteAddress;

            this.clientConnectionHandler(client);
            client.on("close", () => this.clientDisconnectionHandler(client));
            client.on("message", (data) => {
                try {
                    const message = JSON.parse(data.toString()) as SocketMessage;
                    this.clientMessageHandler(client, message);
                } catch {}
            });
        });
    }

    private clientConnectionHandler(client: Client) {
        this.log(`${client.remoteAddress} подключился к серверу.`);
    }

    private clientDisconnectionHandler(client: Client) {
        this.log(`${client.remoteAddress} отключился от сервера.`);
    }

    private clientMessageHandler(client: Client, message: SocketMessage) {
        this.log(`${client.remoteAddress} отправил сообщение: ${JSON.stringify(message)}`);
        this.incomingMessageListeners.forEach((listener) => listener(client, message));
    }

    public log(message: string) {
        console.log(`${new Date().toLocaleString()} | ${message}`);
    }

    public sendMessage(client: Client, message: SocketMessage) {
        this.outcomingMessageListeners.forEach((listener) => listener(client, message));
        client.send(JSON.stringify(message));
    }

    public sendMessageToAll(message: SocketMessage) {
        this.clients.forEach((client) => {
            this.sendMessage(client, message);
        });
    }

    public addIncomigMessageListener(listener: SocketMessageListener) {
        this.incomingMessageListeners.push(listener);
    }

    public removeIncomingMessageListener(listener: SocketMessageListener) {
        this.incomingMessageListeners = this.incomingMessageListeners.filter((_listener) => _listener != listener);
    }

    public addOutcomingMessageListener(listener: SocketMessageListener) {
        this.outcomingMessageListeners.push(listener);
    }

    public removeOutcomingMessageListener(listener: SocketMessageListener) {
        this.outcomingMessageListeners = this.outcomingMessageListeners.filter((_listener) => _listener != listener);
    }
}
