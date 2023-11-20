export enum SocketMessageType {
    REG = "REG",
    REG_RESPONSE = "REG_RESPONSE",
    AUTH = "AUTH",
    AUTH_RESPONSE = "AUTH_RESPONSE",
    INCOMING_PUSH_NOTIFICATION = "INCOMING_PUSH_NOTIFICATION",
}

export interface SocketMessage {
    type: SocketMessageType;
    payload: null | PayloadAuth | PayloadAuthResponse | PayloadIncomingPushNotification;
}

export interface PayloadAuth {
    userName: string;
    password: string;
}

export interface PayloadAuthResponse {
    success: boolean;
    token: string | null;
}

export interface PayloadIncomingPushNotification {
    title: string;
    body: string;
}
