export interface FlashMessageParam {
    [key: string]: string;
}

export interface FlashMessage {
    code: string;
    params: FlashMessageParam;
}

export interface Flash {
    message: FlashMessage;
}

export interface FlashMessageTranslation {
    [key: string]: (params: FlashMessageParam) => string;
}
