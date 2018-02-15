import React, { Component, PropTypes } from 'react';
import TeamViewSmall from '../Teams/TeamViewSmall.jsx';

export default class MatchTeams extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { data } = this.props;
        return (
            <div className="row">
                <div className="column small-5">
                    <TeamViewSmall name={data.teamA.name} countryCode={data.teamA.countryCode}/>
                </div>
                <div className="column small-1"></div>
                <div className="column small-5">
                    <TeamViewSmall name={data.teamB.name} countryCode={data.teamB.countryCode}/>
                </div>
            </div>
        );
    }
}

MatchTeams.propTypes = {
    data: PropTypes.object.isRequired
};
