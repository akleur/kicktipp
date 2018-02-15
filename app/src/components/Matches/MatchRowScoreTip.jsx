import React, { Component, PropTypes } from 'react';
import DateView from '../utils/DateView.jsx';
import TeamView from '../Teams/TeamView.jsx';
import MatchGoals from './MatchGoals.jsx';

export default class MatchRowScoreTip extends Component {
    render() {
        const {
            match,
            fieldTipA,
            fieldTipB,
            ownjoker
        } = this.props;
        const goalsTeamA = match.teamA.goals.toString();
        const goalsTeamB = match.teamB.goals.toString();
        let jokerIsSet = false;
        if (ownjoker) {
            jokerIsSet = ownjoker.matchId && ownjoker.matchId === match.id;
        }

        return (
            <tr className="row score-tip">
                <td className="small-2 medium-2 column" data-sort-value={match.date}>
                    <DateView date={match.date}/>
                </td>
                <td className="small-2 medium-3 column">
                    <TeamView name={match.teamA.name} countryCode={match.teamA.countryCode}/>
                </td>
                <td className="small-2 medium-3 column">
                    <TeamView name={match.teamB.name} countryCode={match.teamB.countryCode}/>
                </td>
                <td className="small-2 column">
                    <MatchGoals scoreA={goalsTeamA} scoreB={goalsTeamB}/>
                    <span className="column kt-icon-goal kt-icon-font text-center"></span>
                </td>
                <td className="small-2 column">
                    <strong>
                        <MatchGoals scoreA={fieldTipA} scoreB={fieldTipB}/>
                    </strong>
                </td>
                <td className="small-2 medium-1 column">
                    {(jokerIsSet === true)
                        ? <div className="show-joker"><img src='/imgs/joker.svg'/></div>
                        : ''
                    }
                </td>
            </tr>
        );
    }
}

MatchRowScoreTip.propTypes = {
    match: PropTypes.object.isRequired,
    ownjoker: PropTypes.object,
    fieldTipA: PropTypes.string,
    fieldTipB: PropTypes.string
};
