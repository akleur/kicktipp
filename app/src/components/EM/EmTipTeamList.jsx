import React, { Component, PropTypes } from 'react';
import EMTipTeamRow from './EMTipTeamRow.jsx';

export default class EmTipTeamList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calculatedTeams: this.props.emTipTeams,
            tipsCount: 0,
            classTeamCol: 'small-4 medium-3 column',
            classTipsCol: 'small-2 column',
            classPercentCol: 'small-2 column',
            classWinCol: 'small-2 column end'
        };
    }

    componentWillMount() {
        this.calculateStats();
    }

    calculateStats() {
        const { emTipTeams } = this.props;

        let tipsCount = 0;
        let calculatedTeams = [];

        emTipTeams.forEach((team) => {
            tipsCount += team.count;
        });

        calculatedTeams = emTipTeams.map((item) => {
            const team = item;
            const percent = (team.count * 100) / tipsCount;
            team.percent = Number((percent).toFixed(2));
            const win = (tipsCount * 5) / team.count;
            team.win = Number((win).toFixed(2));
            return team;
        });

        this.setState({
            tipsCount,
            calculatedTeams
        });
    }

    render() {
        const { countEMTipTeams, currentUser } = this.props;
        const {
            calculatedTeams,
            tipsCount,
            classTeamCol,
            classTipsCol,
            classPercentCol,
            classWinCol
        } = this.state;

        return (
            <div>
                <div className="callout info">{tipsCount} Leute haben für {countEMTipTeams} verschiedene Mannschaften
                    getippt.
                </div>
                <table className="emtip-table">
                    <thead>
                        <tr className="row">
                            <th className={classTeamCol}>
                                Mannschaft
                            </th>
                            <th className={classTipsCol}>
                                Tipps
                            </th>
                            <th className={classPercentCol}>
                                %
                            </th>
                            <th className={classWinCol}>
                                €
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {calculatedTeams.map((team, idx) => {
                            return (
                                <EMTipTeamRow
                                    team={team}
                                    currentUser={currentUser}
                                    {...this.state}
                                    key={idx}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

EmTipTeamList.propTypes = {
    emTipTeams: PropTypes.array.isRequired,
    countEMTipTeams: PropTypes.number.isRequired,
    currentRound: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired
};
