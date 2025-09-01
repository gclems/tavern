export interface FlashMessageParam {
    [key: string]: string;
}

export interface FlashMessage {
    code: string;
    params: FlashMessageParam;
}

export interface Flash {
    message: FlashMessage;
    created_note_id?: string;
}

export interface FlashMessageTranslation {
    [key: string]: (params: FlashMessageParam) => string;
}
