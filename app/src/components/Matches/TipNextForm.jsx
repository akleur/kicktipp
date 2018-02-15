import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import MatchesTable from './MatchesTable.jsx';
import { createValidatorWithData, integer, maxLength } from '../../utils/validation.jsx';

const tipValidation = (data, props) => {
    const fieldsToValidate = {};
    props.fields.forEach((val) => {
        if (val !== 'joker') {
            fieldsToValidate[val] = [integer, maxLength(2)];
        }
    });
    return createValidatorWithData(data, fieldsToValidate);
};

class TipNextForm extends Component {
    render() {
        const { matches } = this.props;
        return (
            <div>
                <h1 className="align-center">Nächste Spiele</h1>
                <div className="callout warning">
                    <strong>Elfmeterregelung:</strong> es zählt das Ergebnis nach der regulären Spielzeit (also nach 90
                    Minuten).<br/>
                    <strong>Joker:</strong> ihr habt nur einen Joker! Wenn ihr ihn schon gesetzt habt und ihn ändern
                    wollt, könnt ihr ihn nur verschieben (solange das betroffenes Spiel nicht angepfiffen ist)...
                </div>
                <MatchesTable
                    matches={matches}
                    fields={this.props.fields}
                    initialValues={this.initialValues}
                    fieldsReadOnly={this.props.fieldsReadOnly}
                    ownjoker={this.props.ownjoker}/>

                {this.props.dirty && this.props.error && <div>Manche Felder sind ungültig</div>}
                <div className="small-12 columns">
                    <button className="button" disabled={this.props.submitting} onClick={this.props.handleSubmit}>
                        Senden
                    </button>
                </div>
            </div>
        );
    }
}

TipNextForm.propTypes = {
    matches: PropTypes.array.isRequired,
    owntips: PropTypes.object.isRequired,
    ownjoker: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    fieldsReadOnly: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'tipsNext',
    validate: tipValidation
})(TipNextForm);
