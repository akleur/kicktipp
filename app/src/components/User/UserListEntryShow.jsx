import React, { Component, PropTypes } from 'react';

export default class UserListEntryShow extends Component {
    render() {
        const { user } = this.props;
        return (
            <tr key={user.id} className="row">
                <td className="column medium-4 small-4">{user.username}</td>
                <td className="column medium-4 small-4">{user.email}</td>
                <td className="column medium-2 small-2"><span className="joker"></span></td>
                <td className="column medium-2 small-2">{user.status}</td>
            </tr>
        );
    }
}

UserListEntryShow.propTypes = {
    user: PropTypes.object
};
