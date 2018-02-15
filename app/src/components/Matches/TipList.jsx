import React, { Component, PropTypes } from 'react';
import dynamicSortMultiple from '../../utils/arraySort.jsx';
import { getCurrentDate } from '../../utils/tipUtils.jsx';
import MatchTipRow from './MatchTipRow.jsx';


export default class TipList extends Component {
    constructor(props) {
        super(props);
        const todayDate = getCurrentDate();
        this.state = {
            tipsSorted: props.tips,
            todayDate,
            classUserCol: 'small-8 medium-8 column',
            classTipCol: 'small-2 medium-2 column end',
            classJokerCol: 'small-2 medium-1 column end',
            sortField: 'user',
            sortOrder: 'DESC'
        };
    }

    sortTips(by, order, fields = []) {
        const { tipsSorted } = this.state;
        const tipsSortedNew = tipsSorted;

        // @Todo: refactor this!!!
        fields[0] = this.state.sortOrder === 'ASC' ? fields[0] : `-${fields[0]}`;
        order = this.state.sortOrder === 'DESC' ? 'ASC' : 'DESC';

        const sortedData = tipsSortedNew.sort(dynamicSortMultiple.apply(this, fields));
        this.setState({
            tipsSorted: sortedData,
            sortField: by,
            sortOrder: order
        });
    }

    render() {
        const { match, currentUser } = this.props;
        const {
            tipsSorted,
            todayDate,
            classUserCol,
            classTipCol,
            classJokerCol,
            sortField,
        } = this.state;
        const orderArrowClass = this.state.sortOrder === 'DESC' ? 'fi-arrow-down' : 'fi-arrow-up';

        let goalsA = '-';
        let goalsB = '-';
        if (match.teamA.goals > -1) {
            goalsA = match.teamA.goals;
        }
        if (match.teamB.goals > -1) {
            goalsB = match.teamB.goals;
        }

        return (
            <div>
                <table>
                    <thead>
                        <tr className="row">
                            <th className={classUserCol}>{match.teamA.name} - {match.teamB.name}</th>
                            <th className={classTipCol}>{goalsA} - {goalsB}</th>
                        </tr>
                    </thead>
                </table>
                <table>
                    <thead>
                        <tr className="row">
                            <th className={classUserCol}>
                                <span role="button" onClick={() => this.sortTips('user', 'ASC', ['username'])}>
                                    Benutzer
                                    {(sortField === 'user')
                                        ? <span className={`${orderArrowClass} ml-1 sort-arrow`}></span>
                                        : <span className={'kt-icon-arrow-up-down ml-1 sort-arrow inactiv'}></span>
                                    }
                                </span>
                            </th>
                            <th className={classTipCol}>
                                <span role="button" onClick={() => this.sortTips('tip', 'ASC', ['tipTeamA', 'tipTeamB'])}>
                                    Tipp
                                    {(sortField === 'tip')
                                        ? <span className={`${orderArrowClass} ml-1 sort-arrow`}></span>
                                        : <span className={'kt-icon-arrow-up-down ml-1 sort-arrow inactiv'}></span>
                                    }
                                </span>
                            </th>
                            <th className={classJokerCol}>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tipsSorted.map((tip, idx) => {
                            const matchDate = new Date(tip.matchDate).getTime();
                            if (matchDate < todayDate) {
                                return (<MatchTipRow
                                    tip={tip}
                                    classUserCol={classUserCol}
                                    classTipCol={classTipCol}
                                    currentUser={currentUser}
                                    classJokerCol={classJokerCol}
                                    key={idx}
                                />);
                            }
                            return '';
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

TipList.propTypes = {
    match: PropTypes.object.isRequired,
    tips: PropTypes.array.isRequired,
    currentUser: PropTypes.object.isRequired
};
