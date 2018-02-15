import React, { Component, PropTypes } from 'react';
import { getCurrentDate } from '../../utils/tipUtils.jsx';
import MatchRowTip from './MatchRowTip.jsx';
import MatchRowTipReadOnly from './MatchRowTipReadOnly.jsx';

export default class MatchesTable extends Component {
    constructor(props) {
        super(props);
        const todayDate = getCurrentDate();
        this.state = {
            todayDate
        };
    }

    render() {
        const { todayDate } = this.state;
        const jokerActive = this.props.fields.joker || false;
        return (
            <div>
                <table className="matches-table">
                    {this.props.roundName &&
                    <caption><h3>{this.props.roundName}</h3></caption>
                    }
                    <tbody>
                        {this.props.matches.map((match, idx) => {
                            const matchDate = new Date(match.date).getTime();
                            if (matchDate < todayDate) {
                                return (<MatchRowTipReadOnly
                                    match={match}
                                    key={idx}
                                    fieldTipA={this.props.fieldsReadOnly[`${match.id}-tipTeamA`]}
                                    fieldTipB={this.props.fieldsReadOnly[`${match.id}-tipTeamB`]}
                                    joker={this.props.fieldsReadOnly.joker}/>);
                            }
                            return (<MatchRowTip
                                match={match}
                                key={idx}
                                fieldTipA={this.props.fieldsReadOnly[`${match.id}-tipTeamA`]}
                                fieldTipB={this.props.fieldsReadOnly[`${match.id}-tipTeamB`]}
                                joker={this.props.fields.joker}
                                jokerActive={jokerActive}
                            />);
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

MatchesTable.propTypes = {
    matches: PropTypes.array.isRequired,
    roundName: PropTypes.string,
    fields: PropTypes.object.isRequired,
    fieldsReadOnly: PropTypes.object.isRequired,
    ownjoker: PropTypes.object
};
