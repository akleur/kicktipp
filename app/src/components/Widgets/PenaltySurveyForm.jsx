import React, { Component, PropTypes } from 'react';

export default class PenaltySurveyForm extends Component {
    render() {
        const {
            fields: { penaltyrule },
            handleSubmit,
            submitting,
        } = this.props;

        return (
            <form onSubmit={handleSubmit} className="row">
                <div className="small-12 column">
                    <p>Was bevorzugst du?</p>
                    <label>
                        <input type="radio" {...penaltyrule} value="1"/> Rule 1
                    </label>
                    <label>
                        <input type="radio" {...penaltyrule} value="2"/> Rule 2
                    </label>
                    <label>
                        <input type="radio" {...penaltyrule} value="3"/> Rule 3
                    </label>
                </div>
                <div className="small-12 column">
                    <button type="submit" className="button" disabled={submitting}>
                        Abschicken
                    </button>
                </div>
            </form>
        );
    }
}


PenaltySurveyForm.propTypes = {
    username: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    userColor: PropTypes.string
};
