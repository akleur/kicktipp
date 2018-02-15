import React, { Component, PropTypes } from 'react';

export default class ChatMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userColor) {
            this.setState({
                backgroundColor: nextProps.userColor
            });
        }
    }

    createMarkup() {
        const rawMarkup = this.props.text;
        return { __html: rawMarkup };
    }

    render() {
        const style = this.state.backgroundColor ? {
            background: this.state.backgroundColor
        } : { backgroundColor: '' };

        return (
            <li className="message-item">
                <div className="chat-message-head" style={style}>
                    <span className="chat-username">{this.props.username}</span>
                    <span className="date-view">
                        <span className="match-date">{this.props.date}</span>
                    </span>
                </div>
                <p className="chat-content" dangerouslySetInnerHTML={this.createMarkup()}>
                </p>
            </li>
        );
    }
}


ChatMessage.propTypes = {
    username: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    userColor: PropTypes.string
};
