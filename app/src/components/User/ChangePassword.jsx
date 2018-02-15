import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createValidator, required, minLength } from '../../utils/validation.jsx';

export const fields = ['password'];

const changePasswordValidation = createValidator({
    password: [required, minLength(6)]
});

class ChangePassword extends Component {
    render() {
        const {
            fields: { password },
            handleSubmit,
            submitting
        } = this.props;

        return (
            <form onSubmit={handleSubmit} className="row phone-padding">
                <h1 className="align-center">Passwort ändern</h1>
                <div className="medium-6 medium-centered">
                    <div className="small-12 column">
                        <label htmlFor="password">Neues Passwort</label>
                        <input type="password" {...password}/>
                        {password.touched && password.error &&
                        <div className="callout small warning">{password.error}</div>
                        }
                    </div>
                    <div className="small-12 column">
                        <button type="submit" className="button" disabled={submitting}>
                            Passwort ändern
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

ChangePassword.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'changePassword',
    fields,
    validate: changePasswordValidation
})(ChangePassword);
