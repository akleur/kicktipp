import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

export const fields = ['penaltyrule'];

export class PenaltySurveyForm extends Component {
    render() {
        const {
            fields: { penaltyrule },
            handleSubmit,
            submitting
        } = this.props;

        return (
            <form onSubmit={handleSubmit} className="row">
                <div className="small-12 column">
                    <p>Welche Elfmeterregelung bevorzugst du um die Tippswerte zu berechnen?</p>
                    <label>
                        <input type="radio" {...penaltyrule} value="1"/> Ergebnis nach der regulären Spielzeit (also
                        nach 90 min)
                    </label>
                    <label>
                        <input type="radio" {...penaltyrule} value="2"/> Ergebnis der im Elfmeterschießen erzielten Tore
                    </label>
                </div>
                <div className="small-12 column">
                    <button type="submit" className="button" disabled={submitting}>
                        Abschicken
                    </button>
                </div>
                <hr/>
            </form>
        );
    }
}

PenaltySurveyForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'penaltySurvey',
    fields
})(PenaltySurveyForm);
