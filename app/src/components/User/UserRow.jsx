import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class UserRow extends Component {
    render() {
        const {
            user,
            currentUser,
            classRangCol,
            classUserCol,
            classPointCol,
            class4erCol,
            class2erCol,
            class1erCol,
            classTrendCol,
            classTipsCol
        } = this.props;

        let trendClass = 'fi-arrow-right';
        if (user.trend === -1) {
            trendClass = 'fi-arrow-down';
        }
        if (user.trend === 1) {
            trendClass = 'fi-arrow-up';
        }

        let currentUserClass = '';
        if (currentUser.id === user.id) {
            currentUserClass = 'user-row-active';
        }

        return (
            <tr className={`row user-row ${currentUserClass}`}>
                <td className={classRangCol}>
                    {(currentUser.id === user.id) &&
                    <a name="me"></a>
                    }
                    {user.rank}
                </td>
                <td className={classUserCol}>
                    {user.username}
                </td>
                <td className={classPointCol}>
                    {user.points}
                </td>
                <td className={class4erCol}>
                    {user.tips4er}
                </td>
                <td className={class2erCol}>
                    {user.tips2er}
                </td>
                <td className={class1erCol}>
                    {user.tips1er}
                </td>
                <td className={classTrendCol}>
                    <span className={`ml-1 hide-for-small show-for-medium ${trendClass}`}></span>
                    <span className={`hide-for-medium ${trendClass}`}></span>
                </td>
                <td className={classTipsCol}>
                    <button className="button">
                        <Link to={`/users/${user.id}`}>Tipps</Link>
                    </button>
                </td>

            </tr>
        );
    }
}

UserRow.propTypes = {
    user: PropTypes.object.isRequired,
    currentRound: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    classRangCol: PropTypes.string.isRequired,
    classUserCol: PropTypes.string.isRequired,
    classPointCol: PropTypes.string.isRequired,
    class4erCol: PropTypes.string.isRequired,
    class2erCol: PropTypes.string.isRequired,
    class1erCol: PropTypes.string.isRequired,
    classTrendCol: PropTypes.string.isRequired,
    classTipsCol: PropTypes.string.isRequired
};
