import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { validateUsername } from '../../actions/actionCreators.jsx';
import { createValidator, required, minLength, email } from '../../utils/validation.jsx';

export const fields = ['username', 'email', 'password', 'invitation', 'mastertip'];

export const initialValues = {
    mastertip: true
};

const registerValidation = createValidator({
    username: [required, minLength(4)],
    email: [required, email],
    password: [required, minLength(6)],
    invitation: required
});

const asyncValidate = (values, dispatch) => {
    return new Promise((resolve, reject) => {
        return dispatch(validateUsername({ username: values.username }))
            .done(() => {
                resolve();
            })
            .fail((data) => {
                let resp = {};
                if (data.responseJSON.data.msg) {
                    resp = { username: 'Dieser Benutzername ist bereits vergeben' };
                }
                reject(resp);
            });
    });
};

class UserRegister extends Component {
    render() {
        const {
            fields: {
                username,
                email,
                password,
                invitation,
                mastertip
            },
            handleSubmit,
            submitting,
        } = this.props;

        return (
            <form onSubmit={handleSubmit} className="row">
                <h1 className="align-center">Ja, ich will</h1>
                <div className="medium-6 medium-centered phone-padding">
                    <div className="small-12 column">
                        <p>Das Tippen für die gesamte Europameisterschaft kostet 10 Taler.</p>
                        <label htmlFor="username">Benutzername</label>
                        <input type="text" placeholder="Diego Maradonna" {...username} />
                        {username.touched && username.error &&
                        <div className="callout small warning">{username.error}</div>
                        }
                        <label htmlFor="email">E-Mail</label>
                        <input type="text" placeholder="mail@mail.de" {...email} />
                        {email.touched && email.error &&
                        <div className="callout small warning">{email.error}</div>
                        }
                        <label htmlFor="password">Passwort</label>
                        <input type="password" {...password}/>
                        {password.touched && password.error &&
                        <div className="callout small warning">{password.error}</div>
                        }
                        <label htmlFor="invitation">Eingeladen von</label>
                        <input type="text" {...invitation} />
                        {invitation.touched && invitation.error &&
                        <div className="callout small warning">{invitation.error}</div>
                        }
                        <label>Meisterschaftstip (+ 5 Taler)</label>
                    </div>
                    <div className="small-6 column">
                        <div className="switch large">
                            <input className="switch-input" id="mastertip" type="checkbox"
                                   checked={mastertip.value === true} {...mastertip} />
                            <label className="switch-paddle" htmlFor="mastertip">
                                <span className="show-for-sr">Meisterschaftstip</span>
                                <span className="switch-active" aria-hidden="true">Jop</span>
                                <span className="switch-inactive" aria-hidden="true">Nö</span>
                            </label>
                        </div>
                    </div>

                    <div className="small-6 column">
                        <button type="submit" className="button float-right" disabled={submitting}>
                            Registrieren
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

UserRegister.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    validateUsername: PropTypes.func.isRequired
};

export default reduxForm({
    form: 'register',
    fields,
    initialValues,
    asyncValidate,
    asyncBlurFields: ['username'],
    validate: registerValidation
})(UserRegister);
