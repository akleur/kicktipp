import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import DateView from '../utils/DateView.jsx';
import TeamView from '../Teams/TeamView.jsx';
import MatchGoals from './MatchGoals.jsx';

export default class MatchRow extends Component {
    render() {
        const { match, showTipsButton } = this.props;
        const goalsTeamA = match.teamA.goals.toString();
        const goalsTeamB = match.teamB.goals.toString();
        return (
            <tr className="row">
                <td className="small-3 column" data-sort-value={match.date}>
                    <DateView date={match.date}/>
                </td>
                <td className="small-2 medium-3 column">
                    <TeamView name={match.teamA.name} countryCode={match.teamA.countryCode}/>
                </td>
                <td className="small-2 medium-3 column">
                    <TeamView name={match.teamB.name} countryCode={match.teamB.countryCode}/>
                </td>
                <td className="small-3 column score-column end">
                    <MatchGoals scoreA={goalsTeamA} scoreB={goalsTeamB}/>
                </td>
                {showTipsButton === true &&
                <td className="small-2 column">
                    <button className="button">
                        <Link to={`/match-all-tips/${match.id}`}>Tipps</Link>
                    </button>
                </td>
                }
            </tr>
        );
    }
}

MatchRow.propTypes = {
    match: PropTypes.object.isRequired,
    showTipsButton: PropTypes.bool
};
