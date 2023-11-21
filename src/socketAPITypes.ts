export enum SocketMessageType {
    SEND_SMS_REG_CODE = "SEND_SMS_REG_CODE",
    SEND_SMS_REG_CODE_RESPONSE = "SEND_SMS_REG_CODE_RESPONSE",
}

export interface SocketMessage {
    type: SocketMessageType;
    payload: null | PayloadSendSMSRegCode | PayloadSendSMSRegCodeResponse;
}

export interface PayloadSendSMSRegCode {
    phoneNumber: string;
}

export interface PayloadSendSMSRegCodeResponse {
    success: boolean;
    code: string | null;
}
