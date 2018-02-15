import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadChatMessages, postChatMessage } from '../actions/actionCreators.jsx';
import Chat from '../components/Chat/Chat.jsx';
import CssSpinner from '../components/utils/CssSpinner.jsx';

class ViewKickbookContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(loadChatMessages());
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isFetching && !nextProps.isFetching) {
            this.setState({ isLoading: false });
        }
    }

    addMessage(message) {
        const { dispatch } = this.props;
        dispatch(postChatMessage(message));
    }

    render() {
        const { messages, isPosting, currentUser } = this.props;

        return (
            <div>
                <h1>Kickbook</h1>
                {!this.state.isLoading
                    ? <Chat messages={messages}
                        currentUser={currentUser}
                        onAddMessage={this.addMessage.bind(this)}
                        isPosting={isPosting}/>
                    : <CssSpinner/>
                }
            </div>
        );
    }
}

ViewKickbookContainer.propTypes = {
    isLoading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isPosting: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    currentUser: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const { loading, chat, auth } = state;
    const { messages, isFetching, isPosting } = chat;
    const { currentUser } = auth;

    return {
        loading,
        auth,
        messages,
        isFetching,
        isPosting,
        currentUser
    };
}

export default connect(mapStateToProps)(ViewKickbookContainer);
