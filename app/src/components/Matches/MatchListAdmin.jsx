import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import MatchRowAdmin from './MatchRowAdmin.jsx';
import { createValidatorWithData, integer, maxLength } from '../../utils/validation.jsx';

const scoreValidation = (data, props) => {
    const fieldsToValidate = {};
    props.fields.forEach((val) => {
        fieldsToValidate[val] = [integer, maxLength(2)];
    });
    return createValidatorWithData(data, fieldsToValidate);
};

class MatchListAdmin extends Component {
    render() {
        const {
            matches,
            fields,
            handleSubmit,
            submitting
        } = this.props;
        return (
            <div>
                <table className="matches-table">
                    <tbody>
                        {matches.items.map((match, idx) => {
                            return (<MatchRowAdmin match={match} key={idx} fieldGoalsA={fields[`${match.id}-goalsA`]}
                                                  fieldGoalsB={fields[`${match.id}-goalsB`]}/>);
                        })}
                    </tbody>
                </table>
                {this.props.dirty && this.props.error && <div>Manche Felder sind ungültig</div>}
                <button className="button" disabled={submitting} onClick={handleSubmit}>
                    Senden
                </button>
            </div>
        );
    }
}

MatchListAdmin.propTypes = {
    matches: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'scores',
    validate: scoreValidation
})(MatchListAdmin);
