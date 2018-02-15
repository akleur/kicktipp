import React, { Component, PropTypes } from 'react';
import dynamicSortMultiple from '../../utils/arraySort.jsx';
import UserRow from './UserRow.jsx';

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ownRank: 0,
            ownPoints: 0,
            usersSorted: props.users,
            usersCount: props.users.length,
            classRangCol: 'small-1 column',
            classUserCol: 'small-6 medium-4 column',
            classPointCol: 'small-1 column',
            class4erCol: 'small-1 column',
            class2erCol: 'small-1 column',
            class1erCol: 'small-1 column',
            classTrendCol: 'small-1 column end',
            classTipsCol: 'small-6 medium-2 column end',
            sortField: 'rank',
            sortOrder: 'DESC'
        };
    }

    componentWillMount() {
        this.getRankForCurrentUser();
    }

    sortUsers(by, order, fields = []) {
        const { usersSorted } = this.state;
        const usersSortedNew = usersSorted;

        // @Todo: refactor this!!!
        fields[0] = this.state.sortOrder === 'ASC' ? fields[0] : `-${fields[0]}`;
        order = this.state.sortOrder === 'DESC' ? 'ASC' : 'DESC';

        const sortedData = usersSortedNew.sort(dynamicSortMultiple.apply(this, fields));
        this.setState({
            usersSorted: sortedData,
            sortField: by,
            sortOrder: order
        });
    }

    getRankForCurrentUser() {
        const { usersSorted } = this.state;
        const { currentUser } = this.props;
        let ownRank = 0;
        let ownPoints = 0;
        for (let i = 0, len = usersSorted.length; i < len; i++) {
            if (usersSorted[i].id === currentUser.id) {
                ownRank = usersSorted[i].rank;
                ownPoints = usersSorted[i].points;
            }
        }
        this.setState({
            ownRank,
            ownPoints
        });
    }

    render() {
        const { currentRound, currentUser } = this.props;
        const {
            ownRank,
            ownPoints,
            usersSorted,
            usersCount,
            classRangCol,
            classUserCol,
            classPointCol,
            class4erCol,
            class2erCol,
            class1erCol,
            classTrendCol,
            classTipsCol,
            sortField
        } = this.state;

        const orderArrowClass = this.state.sortOrder === 'DESC' ? 'fi-arrow-down' : 'fi-arrow-up';

        return (
            <div>
                {(usersCount === 0)
                    ? <div className="callout warning">Rangliste ist nach dem ersten Spiel verfügbar!</div>
                    : <div className="callout info">{usersCount} Leute sind dabei. Du bist auf Platz {ownRank} und
                        hast {ownPoints} Punkte. <a href="#me">Springe zu dir</a></div>
                }

                <table className="users-table">
                    <thead>
                        <tr className="row show-for-large hide-for-small">
                            <th className={classRangCol}>
                                <span role="button" onClick={() => this.sortUsers('rank', 'ASC', ['rank'])}>
                                    P
                                    {(sortField === 'rank')
                                        ? <span className={`${orderArrowClass} ml-1 sort-arrow`}></span>
                                        : <span className={'kt-icon-arrow-up-down ml-1 sort-arrow inactiv'}></span>
                                    }
                                </span>
                            </th>
                            <th className={classUserCol}>
                                <span role="button" onClick={() => this.sortUsers('user', 'ASC', ['username'])}>
                                    Benutzername
                                    {(sortField === 'user')
                                        ? <span className={`${orderArrowClass} ml-1 sort-arrow`}></span>
                                        : <span className={'kt-icon-arrow-up-down ml-1 sort-arrow inactiv'}></span>
                                    }
                                </span>
                            </th>
                            <th className={classPointCol}>Punkte</th>
                            <th className={class4erCol}>4er</th>
                            <th className={class2erCol}>2er</th>
                            <th className={class1erCol}>1er</th>
                            <th className={classTrendCol}></th>
                            <th className={classTipsCol}></th>
                        </tr>
                        <tr className="row hide-for-large table-head-icons ">
                            <th className={classRangCol}>
                                <span role="button" onClick={() => this.sortUsers('rank', 'ASC', ['rank', 'username'])}>
                                    <span className="kt-icon-trophy"></span>
                                    {(sortField === 'rank')
                                        ? <span className={`${orderArrowClass} ml-1 sort-arrow`}></span>
                                        : <span className={'kt-icon-arrow-up-down ml-1 sort-arrow inactiv'}></span>
                                    }
                                </span>
                            </th>
                            <th className={classUserCol}>
                                <span className="fi-torso" role="button" onClick={() => this.sortUsers('user', 'ASC', ['username', 'rank'])}>
                                    {(sortField === 'user')
                                        ? <span className={`${orderArrowClass} ml-1 sort-arrow`}></span>
                                        : <span className={'kt-icon-arrow-up-down ml-1 sort-arrow inactiv'}></span>
                                    }
                                </span>
                            </th>
                            <th className={classPointCol}>P</th>
                            <th className={class4erCol}>4</th>
                            <th className={class2erCol}>2</th>
                            <th className={class1erCol}>1</th>
                            <th className={classTrendCol}></th>
                            <th className={classTipsCol}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersSorted.map((user, idx) => {
                            return (
                                <UserRow
                                    user={user}
                                    currentRound={currentRound}
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

UserList.propTypes = {
    users: PropTypes.array.isRequired,
    currentRound: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired
};
