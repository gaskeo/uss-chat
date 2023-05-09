export interface User {
    name: string,
    password: string,
    salt: string,
    username: string,
    color: string
}

export interface UserPublic {
    username: string,
    name: string
    color: string
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
    id: string,
    time: string,
    user: string
}

export interface EventJoinPublic {
    type: EventTypes.JOIN;
}

export interface EventMessage {
    type: EventTypes.MESSAGE,
    id: string
    time: string,
    user: string,
    message: string,
    media?: string[],
    replyId?: string
}

export interface EventMessagePublic {
    type: EventTypes.MESSAGE,
    message: string,
    media?: string[],
    replyId?: string
}

export interface EventReaction {
    type: EventTypes.REACTION,
    id: string,
    time: string
    messageId: string;
    user: string;
}

export interface EventReactionPublic {
    type: EventTypes.REACTION,
    messageId: string;
}

export type Event = EventJoin | EventMessage | EventReaction;
export type EventPublic = EventJoinPublic | EventMessagePublic | EventReactionPublic;
