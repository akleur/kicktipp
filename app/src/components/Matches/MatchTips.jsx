import React, { Component, PropTypes } from 'react';

export default class MatchTips extends Component {
    render() {
        const { tipField } = this.props;
        return (
            <div>
                <input className={tipField.touched && tipField.error ? 'goal-input error' : 'goal-input'} type="number"
                       min="0" max="99" step="1" placeholder="" {...tipField} />
            </div>
        );
    }
}

MatchTips.propTypes = {
    tipField: PropTypes.object.isRequired
};
