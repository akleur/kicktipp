import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loginUser, setToken } from '../actions/actionCreators.jsx';
import UserLogin from '../components/User/UserLogin.jsx';

class UserLoginContainer extends Component {
    componentWillReceiveProps(nextProps, nextContext) {
        if (!this.props.token && nextProps.token) {
            this.props.dispatch(setToken(nextProps.token));
            nextContext.router.push('/');
        }
    }

    handleSubmit(data) {
        return this.props.dispatch(loginUser(data));
    }

    render() {
        return (
            <UserLogin
                onSubmit={this.handleSubmit.bind(this)}
            />
        );
    }
}

UserLoginContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

UserLoginContainer.contextTypes = {
    router: React.PropTypes.object
};

function mapStateToProps(state) {
    const { auth } = state;
    const { isAuthenticated, token } = auth;

    return {
        isAuthenticated,
        token
    };
}

export default connect(mapStateToProps)(UserLoginContainer);
