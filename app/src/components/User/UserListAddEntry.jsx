import React, { Component, PropTypes } from 'react';

export default class UserListAddEntry extends Component {
    render() {
        return (
            <div className="row">
                <h3>Neuer Tipper</h3>
                <div className="small-3 columns">
                    <label forHTML="username">Username</label>
                    <input type="text" name="username" ref="username" placeholder="Diego Maradonna"/>
                </div>
                <div className="small-3 columns">
                    <label forHTML="email">E-Mail</label>
                    <input type="text" name="email" ref="email" placeholder="mail@mail.de"/>
                </div>
                <div className="small-3 columns">
                    <label forHTML="passwort">Passwort</label>
                    <input type="text" name="password" ref="password"/>
                </div>
                <div className="small-1 columns">
                    <label forHTML="mastertip">Mastertip</label>
                    <input type="checkbox" name="mastertip" ref="mastertip"/>
                </div>
                <div className="small-1 columns">
                    <label forHTML="bezahlt">bezahlt</label>
                    <input type="checkbox" name="bezahlt" ref="bezahlt"/>
                </div>
                <div className="small-1 columns">
                    <button onClick={event => this._addUser(event)} className="button">Hinzu</button>
                </div>
            </div>
        );
    }

    _addUser() {
        const username = this.refs.username.value.trim();
        const password = this.refs.password.value.trim();
        const email = this.refs.email.value.trim();
        const mastertip = this.refs.mastertip.checked;

        const mastertipInt = (mastertip === true) ? 1 : 0;

        const creds = {
            user: {
                username,
                email,
                password,
                mastertip: mastertipInt
            }

        };
        this.props.onAddClick(creds);
    }
}

UserListAddEntry.propTypes = {
    onAddClick: PropTypes.func.isRequired
};
