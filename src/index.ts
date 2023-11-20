import { Server } from "./server";
import { SocketMessage, SocketMessageType, PayloadAuth, PayloadAuthResponse } from "./socketAPITypes";

const server = new Server(5665);

server.addIncomigMessageListener((client, message) => {
    if (message.type == SocketMessageType.AUTH) {
        const { userName, password } = message.payload as PayloadAuth;
        server.sendMessage(client, {
            type: SocketMessageType.AUTH_RESPONSE,
            payload: { success: true, token: userName + password } as PayloadAuthResponse,
        });
    }
});
