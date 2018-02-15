import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeUser, deleteUser } from '../../actions/actionCreators.jsx';
import UserListEntryEdit from './UserListEntryEdit.jsx';
import UserListEntryShow from './UserListEntryShow.jsx';

class UserTableAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shownUsers: this.props.users
        };
    }

    updateShownUsers(userIdToDelete) {
        const { shownUsers } = this.state;
        const indexToDelete = shownUsers.map(el => el.id).indexOf(userIdToDelete);
        const newArr = [...shownUsers.slice(0, indexToDelete), ...shownUsers.slice(indexToDelete + 1)];
        this.setState({
            shownUsers: newArr
        });
    }

    handleDeleteClick(userId) {
        this.updateShownUsers(userId);
        return this.props.dispatch(deleteUser(userId));
    }

    onSubmit(user) {
        const data = user;
        data.mastertip = (data.mastertip) ? 1 : 0;
        return this.props.dispatch(changeUser(data));
    }

    render() {
        const { shownUsers } = this.state;
        const {
            title,
            editable
        } = this.props;

        const heads = [
            { title: 'Username', class: 'column medium-2' },
            { title: 'Email', class: 'column medium-2' },
            { title: 'Bezahlt', class: 'column medium-2' },
            { title: 'Mastertip', class: 'column medium-2 align-center' },
            { title: '', class: 'column medium-2' },
            { title: '', class: 'column medium-2' },
        ];

        const headsIcons = [
            { title: '', class: 'fi-torso column small-4' },
            { title: '', class: 'fi-mail column small-4' },
            { title: '', class: 'fi-dollar column small-4' },
            { title: '', class: 'show-for-medium' },
            { title: '', class: 'show-for-medium' },
            { title: '', class: 'show-for-medium' },
        ];

        return (
            <div>
                <table className="matches-table">
                    <caption><h3>{title} ({shownUsers.length})</h3></caption>
                    <thead>
                        <tr className="show-for-medium row">
                            {heads.map((head, idx) => <th scope="column" key={idx} className={head.class}>{head.title}</th>)}
                        </tr>
                        <tr className="hide-for-medium table-head-icons row">
                            {headsIcons.map((headIcon, idx) => <th scope="column" key={idx} className={`align-center ${headIcon.class}`}></th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {shownUsers.map((user) => {
                            return (
                                ((editable === true) ?
                                    <UserListEntryEdit
                                        key={user.id}
                                        formKey={user.id.toString()}
                                        initialValues={user}
                                        onSubmit={this.onSubmit.bind(this)}
                                        onDeleteClick={this.handleDeleteClick.bind(this)}/>
                                    :
                                    <UserListEntryShow
                                        key={user.id}
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

UserTableAdmin.propTypes = {
    dispatch: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
    editable: PropTypes.string.isRequired
};

export default connect()(UserTableAdmin);
