import React, { Component, PropTypes } from 'react';
import UserListEntryEdit from './UserListEntryEdit.jsx';
import UserListEntryShow from './UserListEntryShow.jsx';

export default class UserListAdmin extends Component {
    render() {
        const heads = [
            'Username',
            'Email',
            'Password',
            'Mastertip',
            'Status',
            'Bezahlt',
            'Delete',
        ];

        return (
            <div>
                <table className="matches-table">
                    <caption><h3>{this.props.title}</h3></caption>
                    <thead>
                        <tr>
                            {heads.map((head, idx) => <th scope="column" key={idx}>{head}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users.map((user, idx) => {
                            return (
                                ((this.props.editable === 'true') ?
                                    <UserListEntryEdit
                                        user={user}
                                        key={idx}
                                        onAddClick={this.props.onAddClick}
                                        onDeleteClick={this.props.onDeleteClick}/>
                                    :
                                    <UserListEntryShow
                                        key={idx}
                                        user={user}/>
                                )
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

UserListAdmin.propTypes = {
    // onAddClick: PropTypes.func.isRequired,
    // onDeleteClick: PropTypes.func.isRequired,
    // fields: PropTypes.object.isRequired,
    // submitting: PropTypes.bool.isRequired
    users: PropTypes.object.isRequired,
    onChangeClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};
