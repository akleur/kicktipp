import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

export const fields = ['id', 'username', 'email', 'mastertip', 'status'];

class UserListEntryEdit extends Component {
    render() {
        const {
            fields: {
                id,
                username,
                email,
                mastertip,
                status
            },
            onDeleteClick,
            handleSubmit,
        } = this.props;

        return (
            <tr id={`user-edit${id.value}`} className="row">
                <td className="column medium-2 small-4"><input type="text" {...username} /></td>
                <td className="column medium-2 small-4"><input type="text" {...email} /></td>
                <td className="column medium-2 small-4">
                    <select {...status} value={status.value || ''}>
                        <option value="registered">Registered</option>
                        <option value="active">Active</option>
                    </select>
                </td>
                <td className="column medium-2 small-4 align-center">
                    <div className="switch large">
                        <input className="switch-input" id={`mastertip${id.value}`} type="checkbox" {...mastertip}
                               checked={mastertip.value}/>
                        <label className="switch-paddle" htmlFor={`mastertip${id.value}`}>
                            <span className="switch-active" aria-hidden="true">J</span>
                            <span className="switch-inactive" aria-hidden="true">N</span>
                        </label>
                    </div>
                </td>
                <td className="column medium-2 small-4 align-center">
                    <button onClick={handleSubmit} className="button">Ändern</button>
                </td>
                <td className="column medium-2 small-4 align-center">
                    <button onClick={() => onDeleteClick(id.value)} className="alert button">Löschen</button>
                </td>
            </tr>
        );
    }
}

UserListEntryEdit.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default reduxForm({
    form: 'user',
    fields
})(UserListEntryEdit);
