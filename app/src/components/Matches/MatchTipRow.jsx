import React, { Component, PropTypes } from 'react';

export default class MatchTipRow extends Component {
    render() {
        const {
            tip,
            classUserCol,
            classTipCol,
            classJokerCol,
            currentUser
        } = this.props;
        let currentUserClass = '';
        if (currentUser.id === tip.userId) {
            currentUserClass = 'user-row-active';
        }

        return (
            <tr className={`row ${currentUserClass}`}>
                <td className={classUserCol}>
                    {tip.username}
                </td>
                <td className={classTipCol}>
                    {tip.tipTeamA} : {tip.tipTeamB}
                </td>
                <td className={classJokerCol}>
                    {tip.joker > 0
                        ? <div className="show-joker"><img src='/imgs/joker.svg'/></div>
                        : ''
                    }
                </td>
            </tr>
        );
    }
}

MatchTipRow.propTypes = {
    tip: PropTypes.object.isRequired,
    classUserCol: PropTypes.string.isRequired,
    classTipCol: PropTypes.string.isRequired,
    classJokerCol: PropTypes.string.isRequired,
    currentUser: PropTypes.object.isRequired
};
