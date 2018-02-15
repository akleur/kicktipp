import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { addUser, validateUsername } from '../actions/actionCreators.jsx';
import UserRegister from '../components/User/UserRegister.jsx';

class UserRegisterContainer extends Component {
    handleSubmit(data) {
        const user = data;
        if (user.mastertip) {
            user.mastertip = 1;
        } else {
            user.mastertip = 0;
        }
        this.props.dispatch(reset('register'));
        return this.props.dispatch(addUser(user));
    }

    validateUsername(data) {
        return this.props.dispatch(validateUsername(data));
    }

    render() {
        return (
            <UserRegister
                validateUsername={this.validateUsername.bind(this)}
                onSubmit={this.handleSubmit.bind(this)}
            />
        );
    }
}

UserRegisterContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { users } = state;
    const { isFetching } = users;

    return {
        isFetching
    };
}

export default connect(mapStateToProps)(UserRegisterContainer);
