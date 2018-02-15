import React, { Component, PropTypes } from 'react';

export default class MatchTipsReadOnly extends Component {
    render() {
        const { tipField } = this.props;
        return (
            <div className="goal">
                {tipField}
            </div>
        );
    }
}

MatchTipsReadOnly.propTypes = {
    tipField: PropTypes.string.isRequired
};
