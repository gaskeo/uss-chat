import {Event, EventDate, EventJoin, EventMessage, EventTypes} from "../../../storage/models";
import React, {useEffect, useRef} from "react";
import {getAuthUser, getUserPublic} from "../../../storage";
import styles from "../styles/room.module.css";
import DateRow from "../../../components/events/dateRow";
import JoinRow from "../../../components/events/joinRow";
import MessageRow from "../../../components/events/messageRow";

interface ChatContentProps {
    events: Event[];
    onImageClick: (src: string) => void;
    onReplyClick: (messageId: string) => void;
}

export function ChatContent({events, onImageClick, onReplyClick}: ChatContentProps) {
    function eventToMessageRow(message: EventMessage) {
        const messageAuthor = getUserPublic(message.user);
        const replyMessage = events.filter(event => (event.type === EventTypes.MESSAGE && event.id === message.replyId))[0] as EventMessage;

        return <MessageRow
            key={message.time + message.type}
            message={message}

            messageAuthorName={messageAuthor?.name || ""}
            updateImagePopupSrc={onImageClick}
            userColor={messageAuthor?.color || ""}
            messageReplyMessage={{
                imageName: replyMessage?.media?.[0],
                message: replyMessage?.message,
                name: getUserPublic(replyMessage?.user)?.name || "",
                id: replyMessage?.id
            }}

            onReply={onReplyClick}
            isMyMessage={message.user === currentUser?.username}
        />
    }

    function eventToJoinRow(joinEvent: EventJoin) {
        const user = getUserPublic(joinEvent.user);
        return <JoinRow
            key={joinEvent.time + joinEvent.type}
            time={joinEvent.time}
            username={joinEvent.user}
            name={user?.name || ""}
        />
    }

    function eventToDateRow(date: EventDate) {
        return <DateRow key={date.id} timestamp={date.time}/>

    }

    const chatRef = useRef<HTMLDivElement>(null);
    const currentUser = getAuthUser();

    useEffect(() => {
        chatRef?.current?.scrollTo(0, chatRef?.current?.scrollHeight);
    }, [events])

    return (
        <div className={styles.chatContent} ref={chatRef}>
            {events.map(e => {
                switch (e.type) {
                    case EventTypes.DATE:
                        return eventToDateRow(e);
                    case EventTypes.JOIN:
                        return eventToJoinRow(e);
                    case EventTypes.MESSAGE:
                        return eventToMessageRow(e);
                    default:
                        return <></>;
                }
            })}
        </div>
    )
}