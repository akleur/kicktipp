import React, { Component, PropTypes } from 'react';
import MatchRowScoreTip from '../Matches/MatchRowScoreTip.jsx';

export default class TipsTable extends Component {
    render() {
        const {
            matches,
            tips,
            roundName,
            ownjoker
        } = this.props;
        return (
            <div>
                <table className="matches-table">
                    {roundName &&
                    <caption><h3>{roundName}</h3></caption>
                    }
                    <tbody>
                        {matches.map((match, idx) => {
                            const tipA = (tips[match.id]) ? tips[match.id].tipTeamA.toString() : '';
                            const tipB = (tips[match.id]) ? tips[match.id].tipTeamB.toString() : '';
                            return (
                                <MatchRowScoreTip
                                    match={match}
                                    key={idx}
                                    fieldTipA={tipA}
                                    fieldTipB={tipB}
                                    ownjoker={ownjoker}/>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

TipsTable.propTypes = {
    matches: PropTypes.array.isRequired,
    tips: PropTypes.object.isRequired,
    roundName: PropTypes.string,
    ownjoker: PropTypes.object.isRequired
};
