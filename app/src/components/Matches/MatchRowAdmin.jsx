import React, { Component, PropTypes } from 'react';
import DateView from '../utils/DateView.jsx';
import TeamView from '../Teams/TeamView.jsx';
import MatchTips from './MatchTips.jsx';

export default class MatchRowAdmin extends Component {
    render() {
        const { match } = this.props;

        return (
            <tr className="row">
                <td className="small-2 column">
                    <DateView date={match.date}/>
                </td>
                <td className="small-2 medium-3 column">
                    <TeamView name={match.teamA.name} countryCode={match.teamA.countryCode}/>
                </td>
                <td className="small-2 medium-3 column">
                    <TeamView name={match.teamB.name} countryCode={match.teamB.countryCode}/>
                </td>
                <td className="small-2 column score-column">
                    <MatchTips tipField={this.props.fieldGoalsA}/>
                </td>
                <td className="small-2 column score-column end">
                    <MatchTips tipField={this.props.fieldGoalsB}/>
                </td>
            </tr>
        );
    }
}

MatchRowAdmin.propTypes = {
    match: PropTypes.object.isRequired,
    fieldGoalsA: PropTypes.object.isRequired,
    fieldGoalsB: PropTypes.object.isRequired
};
