import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../actions/actionCreators.jsx';
import UserList from '../components/User/UserList.jsx';
import CssSpinner from '../components/utils/CssSpinner.jsx';


class ViewUserListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(loadUsers());
    }

    componentWillReceiveProps(nextProps) {
        const { isFetchingUsers } = this.props;
        if (isFetchingUsers && !nextProps.isFetchingUsers) {
            this.setState({
                isLoading: false
            });
        }
    }

    render() {
        const { users, currentRound, currentUser } = this.props;

        return (
            <div>
                <h1>Userliste</h1>
                {!this.state.isLoading
                    ? <UserList users={users.items} currentUser={currentUser} currentRound={currentRound}/>
                    : <CssSpinner/>
                }
            </div>
        );
    }
}

ViewUserListContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetchingUsers: PropTypes.bool.isRequired,
    users: PropTypes.object.isRequired,
    currentRound: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const { users, rounds, auth } = state;
    const isFetchingUsers = users.isFetching;
    const currentRound = rounds.current;
    const { currentUser } = auth;

    return {
        users,
        isFetchingUsers,
        currentRound,
        currentUser
    };
}

export default connect(mapStateToProps)(ViewUserListContainer);
