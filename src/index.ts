import { Server } from "./server";
import { SocketMessageType, PayloadSendSMSRegCodeResponse } from "./socketAPITypes";

const server = new Server(5665);

server.addIncomigMessageListener((client, message) => {
    if (message.type == SocketMessageType.SEND_SMS_REG_CODE) {
        server.sendMessage(client, {
            type: SocketMessageType.SEND_SMS_REG_CODE_RESPONSE,
            payload: {
                success: true,
                code: "12345",
            } as PayloadSendSMSRegCodeResponse,
        });
    }
});
