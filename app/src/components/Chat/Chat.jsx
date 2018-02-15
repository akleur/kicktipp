import React, { Component, PropTypes } from 'react';
import MessageList from './MessageList.jsx';
import MessageEntryBox from './MessageEntryBox.jsx';

export default class Chat extends Component {
    render() {
        const {
            messages,
            currentUser,
            onAddMessage,
            isPosting
        } = this.props;
        return (
            <div>
                <MessageEntryBox currentUser={currentUser}
                                 onAddMessage={onAddMessage}
                                 isPosting={isPosting}
                                 className="large-12 column"/>
                <MessageList messages={messages}/>
            </div>
        );
    }
}

Chat.propTypes = {
    messages: PropTypes.array.isRequired,
    currentUser: PropTypes.object.isRequired,
    onAddMessage: PropTypes.func.isRequired,
    isPosting: PropTypes.bool.isRequired
};
