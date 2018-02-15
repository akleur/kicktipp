import React, { Component, PropTypes } from 'react';
import TeamView from '../Teams/TeamView.jsx';

export default class EMTipTeamRow extends Component {
    render() {
        const {
            team,
            classTeamCol,
            classTipsCol,
            classPercentCol,
            classWinCol
        } = this.props;

        return (
            <tr className="row">
                <td className={classTeamCol}>
                    <TeamView name={team.name} countryCode={team.countryCode}/>
                </td>
                <td className={classTipsCol}>
                    {team.count}
                </td>
                <td className={classPercentCol}>
                    {team.percent}%
                </td>
                <td className={classWinCol}>
                    Taler {team.win}
                </td>
            </tr>
        );
    }
}

EMTipTeamRow.propTypes = {
    team: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    classTeamCol: PropTypes.string.isRequired,
    classTipsCol: PropTypes.string.isRequired,
    classPercentCol: PropTypes.string.isRequired,
    classWinCol: PropTypes.string.isRequired
};
