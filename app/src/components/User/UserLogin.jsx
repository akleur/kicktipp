import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import RandomPicWidget from '../Widgets/RandomPicWidget.jsx';

export const fields = ['username', 'password'];

class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picPath: '/random_pics/random_1/',
            picRandomRange: {
                min: 1,
                max: 14
            }
        };
    }

    render() {
        const {
            fields: { username, password },
            handleSubmit,
            submitting
        } = this.props;
        const { picPath, picRandomRange } = this.state;

        return (
            <div className="login-form">
                <h1 className="align-center">Come in!</h1>
                <div className="row">
                    <div className="medium-6 medium-centered phone-padding">
                        <RandomPicWidget picPath={picPath} picRandomRange={picRandomRange}/>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="phone-padding">
                    <div className="medium-6 medium-centered ">
                        <label htmlFor="username">Name</label>
                        <input type="text" placeholder="Diego Maradonna" {...username} />
                        <label htmlFor="password">Passwort</label>
                        <input type="password" {...password} />
                        <button type="submit" disabled={submitting} className="button">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

UserLogin.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'login',
    fields
})(UserLogin);
