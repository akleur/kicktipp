import React, { Component, PropTypes } from 'react';
import MatchRowScoreTip from '../Matches/MatchRowScoreTip.jsx';

export default class TipListUser extends Component {
    render() {
        const { tips } = this.props;

        return (
            <div>
                <table>
                    <tbody>
                        {tips.map((tip, idx) => {
                            const fieldTipA = tip.tipTeamA.toString();
                            const fieldTipB = tip.tipTeamB.toString();

                            const match = {
                                id: tip.matchId,
                                date: tip.matchDate,
                                teamA: {
                                    name: tip.teamAName,
                                    countryCode: tip.countryCodeA,
                                    goals: tip.goalsTeamA
                                },
                                teamB: {
                                    name: tip.teamBName,
                                    countryCode: tip.countryCodeB,
                                    goals: tip.goalsTeamB
                                }
                            };

                            return (
                                <MatchRowScoreTip
                                    match={match}
                                    key={idx}
                                    fieldTipA={fieldTipA}
                                    fieldTipB={fieldTipB}
                                    userjoker={tip.joker}/>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

TipListUser.propTypes = {
    tips: PropTypes.array.isRequired
};
