import React, { Component, PropTypes } from 'react';
import TipsTable from './TipsTable.jsx';

export default class OwnTipsList extends Component {
    constructor(props) {
        super(props);
        this.State = {
            matchesPerRound: {}
        };
    }

    componentWillMount() {
        const { matches, rounds } = this.props;
        this.groupMatchesPerRound(matches, rounds);
    }

    groupMatchesPerRound(matches, rounds) {
        const matchesPerRound = {};
        rounds.map((round) => {
            matchesPerRound[round.id] = { name: round.name, items: [] };
        });
        matches.map((match) => {
            matchesPerRound[match.roundId].items.push(match);
        });
        this.setState({
            matchesPerRound
        });
    }

    render() {
        const { matchesPerRound } = this.state;
        const { owntips, ownjoker } = this.props;
        return (
            <div>
                <h1 className="align-center">Deine Tipps</h1>
                {Object.keys(matchesPerRound).map((prop, idx) => {
                    return (
                        <TipsTable
                            key={idx}
                            roundName={matchesPerRound[prop].name}
                            matches={matchesPerRound[prop].items}
                            tips={owntips}
                            ownjoker={ownjoker}/>
                    );
                })}
            </div>
        );
    }
}

OwnTipsList.propTypes = {
    matches: PropTypes.array.isRequired,
    owntips: PropTypes.object.isRequired,
    ownjoker: PropTypes.object.isRequired,
    rounds: PropTypes.array.isRequired
};
