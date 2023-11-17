import { WebSocket, WebSocketServer } from "ws";

export interface Client extends WebSocket {
    remoteAddress?: string;
}

export enum SocketMessageType {
    LOGIN = "LOGIN",
    LOGIN_RESPONSE = "LOGIN_RESPONSE",
    INCOMING_PUSH_NOTIFICATION = "INCOMING_PUSH_NOTIFICATION",
}

export interface PayloadLogin {
    userName: string;
    password: string;
}

export interface PayloadLoginResponse {
    success: boolean;
    token: string | null;
}

export interface PayloadIncomingPushNotification {
    title: string;
    body: string;
}

export interface SocketMessage {
    type: SocketMessageType;
    payload: null | PayloadLogin | PayloadLoginResponse | PayloadIncomingPushNotification;
}

export class Server extends WebSocketServer {
    constructor(port: number) {
        super({ port: port });

        this.on("listening", () => {
            console.log(`Сервер запущен на ${port} порте.`);
        });

        this.on("connection", (connection, request) => {
            const client: Client = connection;
            client.remoteAddress = request.socket.remoteAddress;

            this.clientConnectionHandler(client);
        });
    }

    private clientConnectionHandler(client: Client) {
        console.log(`${client.remoteAddress} подключился к серверу.`);
        client.send("Hello client");
    }

    public sendMessageToAll(message: SocketMessage) {
        this.clients.forEach((client) => {
            client.send(JSON.stringify(message));
        });
    }
}
