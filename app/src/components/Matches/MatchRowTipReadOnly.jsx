import React, { Component, PropTypes } from 'react';
import DateView from '../utils/DateView.jsx';
import TeamView from '../Teams/TeamView.jsx';
import MatchGoals from './MatchGoals.jsx';

export default class MatchRowTipReadOnly extends Component {
    render() {
        return (
            <tr className="row">
                <td className="small-2 medium-2 column" data-sort-value={this.props.match.date}>
                    <DateView date={this.props.match.date}/>
                </td>
                <td className="small-2 medium-2 column">
                    <TeamView name={this.props.match.teamA.name} countryCode={this.props.match.teamA.countryCode}/>
                </td>
                <td className="small-2 medium-2 column">
                    <TeamView name={this.props.match.teamB.name} countryCode={this.props.match.teamB.countryCode}/>
                </td>
                <td className="small-4 medium-4 column end">
                    <MatchGoals scoreA={this.props.fieldTipA} scoreB={this.props.fieldTipB}/>
                </td>
                {this.props.joker === this.props.match.id &&
                <td className="small-2 medium-1 column end">
                    <div className="show-joker"><img src='/imgs/joker.svg'/></div>
                </td>
                }
            </tr>
        );
    }
}

MatchRowTipReadOnly.propTypes = {
    match: PropTypes.object.isRequired,
    joker: PropTypes.number,
    fieldTipA: PropTypes.string,
    fieldTipB: PropTypes.string
};
