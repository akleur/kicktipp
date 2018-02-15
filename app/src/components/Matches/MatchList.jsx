import React, { Component, PropTypes } from 'react';
import { getCurrentDate } from '../../utils/tipUtils.jsx';
import MatchRow from './MatchRow.jsx';

export default class MatchList extends Component {
    constructor(props) {
        super(props);
        const todayDate = getCurrentDate();
        this.state = {
            todayDate,
            matchListPast: [],
            matchListFuture: [],
            tabs: [
                {
                    title: 'Vergangene'
                },
                {
                    title: 'Zukünftige'
                }
            ],
            activeTab: 1
        };
    }

    componentWillMount() {
        const { matches } = this.props;
        const { todayDate } = this.state;

        const matchListPast = [];
        const matchListFuture = [];

        matches.map((match) => {
            const matchDate = new Date(match.date).getTime();
            if (matchDate < todayDate) {
                matchListPast.push(match);
            } else {
                matchListFuture.push(match);
            }
        });

        this.setState({
            matchListPast,
            matchListFuture
        });
    }

    componentDidMount() {
        const MatchListTabs = new Foundation.Tabs($('#MatchListTabs'));
        $('#MatchListTabs').on('change.zf.tabs', (evt, data) => {
            this.setState({ activeTab: data[0].tabIndex });
        });
    }

    render() {
        const {
            todayDate,
            tabs,
            matchListFuture,
            matchListPast
        } = this.state;
        return (
            <div>
                <ul className="tabs group-tabs" data-tab role="tablist" id="MatchListTabs">
                    {tabs.map((tab, idx) => {
                        const activeClass = this.state.activeTab === idx ? 'is-active' : '';
                        return (<li className={`tabs-title small-6 ${activeClass}`} tabIndex={idx} key={idx}>
                            <a role="tab" href={`#panel2-${idx}`}>{tab.title}</a>
                        </li>);
                    })}
                </ul>
                <div className="tabs-content" data-tabs-content="MatchListTabs">
                    <section role="tabpanel" className="tabs-panel tabs-matches" id="panel2-0">
                        <table className="matches-table">
                            <tbody>
                                {matchListPast.map((match, idx) => {
                                    const matchDate = new Date(match.date).getTime();
                                    const showTipsButton = matchDate < todayDate || false;
                                    return (<MatchRow
                                        match={match}
                                        showTipsButton={showTipsButton}
                                        key={idx}
                                    />);
                                })}
                            </tbody>
                        </table>
                    </section>
                    <section role="tabpanel" className="tabs-panel tabs-matches is-active" id="panel2-1">
                        <table className="matches-table">
                            <tbody>
                                {matchListFuture.map((match, idx) => {
                                    return (<MatchRow
                                        match={match}
                                        key={idx}
                                    />);
                                })}
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>
        );
    }
}

MatchList.propTypes = {
    matches: PropTypes.array.isRequired
};
