export enum SocketMessageType {
    LOGIN = "LOGIN",
    LOGIN_RESPONSE = "LOGIN_RESPONSE",
    INCOMING_PUSH_NOTIFICATION = "INCOMING_PUSH_NOTIFICATION",
}

export interface SocketMessage {
    type: SocketMessageType;
    payload: null | PayloadLogin | PayloadLoginResponse | PayloadIncomingPushNotification;
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
