import React, { Component, PropTypes } from 'react';
import DateView from '../utils/DateView.jsx';
import TeamView from '../Teams/TeamView.jsx';
import MatchTips from './MatchTips.jsx';

export default class MatchRowTip extends Component {
    toggleJoker() {
        if (this.props.joker.value !== '') {
            this.props.joker.value = '';
        }
    }

    render() {
        const { jokerActive } = this.props;
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
                <td className="small-2 medium-2 column">
                    <MatchTips tipField={this.props.fieldTipA}/>
                </td>
                <td className="small-2 medium-2 column">
                    <MatchTips tipField={this.props.fieldTipB}/>
                </td>
                <td className="small-2 large-2 column end">
                    {(jokerActive === true)
                        ? <label className="joker-input">
                            <input className="checkbox-joker" type="radio" {...this.props.joker}
                                   value={this.props.match.id} checked={this.props.joker.value === this.props.match.id}/>
                            <img src='/imgs/joker.svg'/>
                        </label>
                        : ''
                    }
                </td>
            </tr>
        );
    }
}

MatchRowTip.propTypes = {
    match: PropTypes.object.isRequired,
    jokerActive: PropTypes.bool
};
