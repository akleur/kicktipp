import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { changePassword } from '../actions/actionCreators.jsx';
import ChangePassword from '../components/User/ChangePassword.jsx';

class UserChangePasswordContainer extends Component {
    handleSubmit(data) {
        this.props.dispatch(reset('changePassword'));
        return this.props.dispatch(changePassword({ password: data.password }));
    }

    render() {
        return (
            <ChangePassword
                onSubmit={this.handleSubmit.bind(this)}
            />
        );
    }
}

UserChangePasswordContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { auth } = state;

    return {
        auth
    };
}

export default connect(mapStateToProps)(UserChangePasswordContainer);
