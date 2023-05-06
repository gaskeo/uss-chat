export interface User {
    name: string,
    password: string,
    salt: string,
    username: string
}

export interface Room {
    id: string;
    name: string;
    users: string[];
}

export enum EventTypes {
    JOIN,
    MESSAGE,
    REACTION
}

export interface EventJoin {
    type: EventTypes.JOIN,
    time: string,
    user: string
}
export interface EventMessage {
    type: EventTypes.MESSAGE,
    id: string
    time: string,
    user: string,
    message: string,
    media: string[],
    replyId: string
}

export interface EventReaction {
    type: EventTypes.REACTION,
    messageId: string;
    user: string;
}

export type Event = EventJoin | EventMessage | EventReaction;