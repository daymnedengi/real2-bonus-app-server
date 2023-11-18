import { Server } from "./server";
import { PayloadLogin, PayloadLoginResponse, SocketMessage, SocketMessageType } from "./socketAPITypes";

const server = new Server(5665);

server.addIncomigMessageListener((client, message) => {
    if (message.type == SocketMessageType.LOGIN) {
        const { userName, password } = message.payload as PayloadLogin;
        server.sendMessage(client, {
            type: SocketMessageType.LOGIN_RESPONSE,
            payload: { success: true, token: userName + password } as PayloadLoginResponse,
        });
    }
});
