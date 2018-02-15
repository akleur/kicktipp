import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadUsersAdmin } from '../actions/actionCreators.jsx';
import UserListAdmin from '../components/User/UserListAdmin.jsx';

class AdminUserListContainer extends Component {
    constructor(props) {
        super(props);
        this.filteredUsers = {
            notPayedUsers: [],
            payedUsers: [],
            users: []
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(loadUsersAdmin());
    }

    filterUsers(users) {
        const notPayedUsers = users.filter(user => user.status === 'registered');
        const payedUsers = users.filter(user => user.status === 'active');
        this.filteredUsers = {
            notPayedUsers,
            payedUsers,
            users
        };

        return this.filteredUsers;
    }

    render() {
        const { users, isFetching } = this.props;
        const filteredUsers = (!isFetching) ? this.filterUsers(users.items) : this.filteredUsers;

        return (
            <div>
                {isFetching
                    ? <h3>Loading...</h3>
                    : <div>
                        <UserListAdmin filteredUsers={filteredUsers}/>
                    </div>
                }
            </div>
        );
    }
}

AdminUserListContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    const { users, auth } = state;
    const { currentUser } = auth;
    const { isFetching } = users;

    return {
        auth,
        currentUser,
        isFetching,
        users
    };
}

export default connect(mapStateToProps)(AdminUserListContainer);
