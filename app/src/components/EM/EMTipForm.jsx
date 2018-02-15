import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import TeamView from '../Teams/TeamView.jsx';

class EMTipForm extends Component {
    render() {
        const {
            teams,
            fields: { emtip },
            handleSubmit,
            submitting
        } = this.props;

        let isFormDisabled = false;
        if (submitting || !emtip.value) {
            isFormDisabled = true;
        }

        return (
            <div>
                <h1 className="align-center">EM-Tipp</h1>
                <div className="em-tip">
                    {teams.items.map((team, idx) => {
                        return (
                            <div key={idx} className="small-6 large-3 columns">
                                <div className="team-meta">
                                    <small>Gruppe {team.groupName}</small>
                                </div>
                                <TeamView name={team.name} countryCode={team.countryCode}/>
                                <div><input type="radio" {...emtip} value={team.id} checked={emtip.value === team.id}/>
                                </div>
                            </div>
                        );
                    })}
                    <div className="small-12 columns">
                        <button className="button" disabled={isFormDisabled} onClick={handleSubmit}>
                            Senden
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

EMTipForm.propTypes = {
    teams: PropTypes.object.isRequired,
    ownEMTip: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'EMTip'
})(EMTipForm);
