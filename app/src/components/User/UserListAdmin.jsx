import React, { Component, PropTypes } from 'react';
import Tabs from '../Design/Tabs.jsx';
import UserTableAdmin from './UserTableAdmin.jsx';

export default class UserListAdmin extends Component {
    render() {
        const tabData = [
            {
                title: {
                    name: 'Alle',
                    width: 6
                },
                content: <UserTableAdmin users={this.props.filteredUsers.users} title="Alle User" editable="true"/>
            },
            {
                title: {
                    name: 'Aktive',
                    width: 6
                },
                content: <UserTableAdmin users={this.props.filteredUsers.payedUsers} title="Bezahlte" editable="false"/>
            }
        ];

        return (
            <div>
                <Tabs data={tabData}/>
            </div>
        );
    }
}

UserListAdmin.propTypes = {
    filteredUsers: PropTypes.object.isRequired
};
