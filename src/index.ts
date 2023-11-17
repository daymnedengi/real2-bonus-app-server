import { PayloadIncomingPushNotification, Server, SocketMessageType } from "./server";

const server = new Server(5665);

setInterval(() => {
    server.sendMessageToAll({
        type: SocketMessageType.INCOMING_PUSH_NOTIFICATION,
        payload: {
            title: "Начисление бонусных баллов.",
            body: "Вам было начислено 500 бонусных баллов!",
        } as PayloadIncomingPushNotification,
    });
}, 3000);
