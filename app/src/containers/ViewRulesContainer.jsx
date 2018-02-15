import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Rules from '../components/Rules.jsx';

class ViewRulesContainer extends Component {
    render() {
        return (
            <Rules
                year="2016"
                competition="Europameisterschaft"
            />
        );
    }
}

ViewRulesContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { users } = state;

    return {
        users
    };
}

export default connect(mapStateToProps)(ViewRulesContainer);
