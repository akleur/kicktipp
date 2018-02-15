import React, { Component, PropTypes } from 'react';
import { getFullDate } from '../../utils/dateFuncs.jsx';
import ChatMessage from './ChatMessage.jsx';

export default class MessageList extends Component {
    render() {
        const { messages } = this.props;
        return (
            <ul className='message-list large-12 column'>
                {messages.map((message, index) => {
                    const dateFormatted = getFullDate(message.date);
                    return (
                        <ChatMessage key={index} date={dateFormatted} username={message.username} text={message.text}/>
                    );
                })}
            </ul>
        );
    }
}

MessageList.propTypes = {
    messages: PropTypes.array.isRequired
};
