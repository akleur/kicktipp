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

class KnockoutForm extends Component {
    constructor(props) {
        super(props);
        this.State = {
            matchesPerRound: {}
        };
    }

    componentWillMount() {
        const { matches, rounds } = this.props;
        this.groupMatchesPerRound(matches, rounds);
    }

    groupMatchesPerRound(matches, rounds) {
        const matchesPerRound = {};
        rounds.map((round) => {
            matchesPerRound[round.name] = { id: round.id, items: [] };
        });
        matches.map((match) => {
            matchesPerRound[match.roundName].items.push(match);
        });
        this.setState({
            matchesPerRound
        });
    }

    render() {
        const { matchesPerRound } = this.state;
        return (
            <div>
                <h1 className="align-center">Finalrunden</h1>
                <div className="callout warning">
                    <strong>Elfmeterregelung:</strong> es zählt das Ergebnis nach der regulären Spielzeit (also nach 90
                    Minuten).<br/>
                    <strong>Joker:</strong> ihr habt nur einen Joker! Wenn ihr ihn schon gesetzt habt und ihn ändern
                    wollt, könnt ihr ihn nur verschieben (solange das betroffene Spiel nicht angepfiffen ist)...
                </div>
                {Object.keys(matchesPerRound).map((prop) => {
                    return (
                        <MatchesTable
                            key={matchesPerRound[prop].id}
                            roundName={prop}
                            matches={matchesPerRound[prop].items}
                            fields={this.props.fields}
                            initialValues={this.initialValues}
                            fieldsReadOnly={this.props.fieldsReadOnly}
                            ownjoker={this.props.ownjoker}/>
                    );
                })}

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

KnockoutForm.propTypes = {
    matches: PropTypes.array.isRequired,
    owntips: PropTypes.object.isRequired,
    ownjoker: PropTypes.object.isRequired,
    rounds: PropTypes.array.isRequired,
    fields: PropTypes.object.isRequired,
    fieldsReadOnly: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'tipsKnockout',
    validate: tipValidation
})(KnockoutForm);
