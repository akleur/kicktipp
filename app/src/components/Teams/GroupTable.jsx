import React, { Component, PropTypes } from 'react';
import TeamViewSmall from '../Teams/TeamViewSmall.jsx';
import MatchTeams from '../Matches/MatchTeams.jsx';
import Score from '../Matches/Score.jsx';
import DateView from '../utils/DateView.jsx';
import dynamicSortMultiple from '../../utils/arraySort.jsx';

export default class GroupTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamStats: []
        };
    }

    componentWillMount() {
        const { group } = this.props;
        this.getTeamStats(group);
    }

    getTeamStats(group) {
        const teamStats = [];
        group.teams.map((team) => {
            let gameCount = 0,
                winCount = 0,
                drawCount = 0,
                defeatCount = 0,
                goalCount = 0,
                reverseGoalCount = 0,
                goalsDiff = 0,
                pointCount = 0;

            group.matches.map((match) => {
                const goalsA = match.teamA.goals;
                const goalsB = match.teamB.goals;
                if (match.teamA.id === team.id || match.teamB.id === team.id) {
                    if (goalsA > -1 && goalsB > -1) {
                        gameCount++;

                        if (match.teamA.id === team.id) {
                            goalCount += match.teamA.goals;
                            reverseGoalCount += match.teamB.goals;
                        } else {
                            goalCount += match.teamB.goals;
                            reverseGoalCount += match.teamA.goals;
                        }

                        if (goalsA > goalsB) {
                            if (match.teamA.id === team.id) {
                                winCount++;
                                pointCount += 3;
                            } else {
                                defeatCount++;
                            }
                        }
                        if (goalsA === goalsB) {
                            drawCount++;
                            pointCount += 1;
                        }
                        if (goalsA < goalsB) {
                            if (match.teamB.id === team.id) {
                                winCount++;
                                pointCount += 3;
                            } else {
                                defeatCount++;
                            }
                        }

                        goalsDiff = goalCount - reverseGoalCount;
                    }
                }
            });

            const teamObj = {
                id: team.id,
                name: team.name,
                countryCode: team.countryCode,
                gameCount,
                winCount,
                drawCount,
                defeatCount,
                goalCount,
                reverseGoalCount,
                goalsDiff,
                pointCount
            };
            teamStats.push(teamObj);
        });

        this.getRanking(teamStats);
    }

    getRanking(teamStats) {
        const fields = ['-pointCount', '-goalsDiff', '-goalCount'];
        teamStats.sort(dynamicSortMultiple.apply(this, fields));

        this.setState({
            teamStats
        });

        // TODO: use more rules to sort
        /*
        teamStats.sort(function (a, b) {
          if (a.pointCount > b.pointCount) {
            return 1;
          }
          if (a.pointCount < b.pointCount) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });

        teamStats.reverse();

        for (var i = 0, len = teamStats.length; i < len; i++) {
          if (i > 0) {
            if (teamStats[i].points === teamStats[i-1].points) {
              group.matches.map((match) => {
                if (match.teamA.id === teamStats[i].id && match.teamB.id === teamStats[i-1].id) {
                  var score = match.teamA.goals - match.teamB.goals;
                  if (score > 0) {
                    teamStats[i].rank = i+1;
                  }
                  else {
                    teamStats[i].rank = i+2;
                    teamStats[i-1].rank = i+1;
                  }
                }
                if (match.teamB.id === teamStats[i].id && match.teamA.id === teamStats[i-1].id) {
                  var score = match.teamB.goals - match.teamA.goals;
                  if (score > 0) {
                    teamStats[i].rank = i+1;
                  }
                  else {
                    teamStats[i].rank = i+2;
                    teamStats[i-1].rank = i+1;
                  }
                }
              });
            }
            else {
              teamStats[i].rank = i+1;
            }
          }
          else {
            teamStats[i].rank = 1;
          }
        }
        */
    }

    render() {
        const { group } = this.props;
        const { teamStats } = this.state;

        return (
            <div>
                <h4 className>Gruppe {group.name}</h4>
                <table className="group-table">
                    <thead>
                        <tr className="show-for-large hide-for-small row">
                            <th className="column medium-1">Rang</th>
                            <th className="column medium-5">Mannschaft</th>
                            <th className="column medium-1 text-center">Spiele</th>
                            <th className="column medium-1 text-center">Siege</th>
                            <th className="column medium-1 text-center">Unent.</th>
                            <th className="column medium-1 text-center">Nieder.</th>
                            <th className="column medium-1 text-center">Tore</th>
                            <th className="column medium-1 text-center">Punkte</th>
                        </tr>
                        <tr className="hide-for-large table-head-icons row">
                            <th className="column small-1 kt-icon-trophy kt-icon-font text-center"></th>
                            <th className="column small-4 medium-5 fi-torsos-all kt-icon-font"></th>
                            <th className="column small-1 text-center">S</th>
                            <th className="column small-1 kt-icon-like kt-icon-font text-center"></th>
                            <th className="column small-1 kt-icon-equal kt-icon-font text-center"></th>
                            <th className="column small-1 kt-icon-dislike kt-icon-font text-center"></th>
                            <th className="column small-2 medium-1 kt-icon-goal kt-icon-font text-center"></th>
                            <th className="column small-1 text-center">P</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamStats.map((team, idx) => {
                            const ranking = idx + 1;
                            const score = {
                                teamA: team.goalCount,
                                teamB: team.reverseGoalCount
                            };
                            return (
                                <tr key={idx}>
                                    <td className="column small-1 medium-1 text-center">{ranking}</td>
                                    <td className="column small-4 medium-5 ">
                                        <div className="small-7 medium-5">
                                            <TeamViewSmall name={team.name} countryCode={team.countryCode}/>
                                        </div>
                                    </td>
                                    <td className="column small-1 medium-1 text-center">{team.gameCount}</td>
                                    <td className="column small-1 medium-1 text-center">{team.winCount}</td>
                                    <td className="column small-1 medium-1 text-center">{team.drawCount}</td>
                                    <td className="column small-1 medium-1 text-center">{team.defeatCount}</td>
                                    <td className="column small-2 medium-1 text-center no-wrap">
                                        <Score score={score}/>
                                    </td>
                                    <td className="column small-1 medium-1 text-center">{team.pointCount}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <table className="group-table">
                    <thead>
                        <tr className="show-for-large hide-for-small row">
                            <th className="column small-1 show-for-medium ">&nbsp;</th>
                            <th className="column small-6 medium-5">Spiel</th>
                            <th className="column small-1 show-for-medium ">&nbsp;</th>
                            <th className="column small-4 medium-3">Datum</th>
                            <th className="column small-2 large-2 text-center">Ergebnis</th>
                        </tr>
                        <tr className="hide-for-large table-head-icons row">
                            <th className="column small-1 show-for-medium ">&nbsp;</th>
                            <th className="column small-6 medium-5">Spiel</th>
                            <th className="column small-1 show-for-medium ">&nbsp;</th>
                            <th className="column small-4 medium-3">Datum</th>
                            <th className="column small-2 kt-icon-goal kt-icon-font text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {group.matches.map((match, idx) => {
                            const goalsA = (match.teamA.goals === -1) ? '' : match.teamA.goals;
                            const goalsB = (match.teamB.goals === -1) ? '' : match.teamB.goals;
                            const score = {
                                teamA: goalsA,
                                teamB: goalsB
                            };
                            return (
                                <tr key={idx} className="row">
                                    <td className="column small-1 show-for-medium "></td>
                                    <td className="column small-6 medium-5"><MatchTeams data={match}/></td>
                                    <td className="column small-1 show-for-medium "></td>
                                    <td className="column small-4 medium-3"><DateView date={match.date}/></td>
                                    <td className="column small-2 large-2 text-center"><Score score={score}/></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div>

        );
    }
}

GroupTable.propTypes = {
    group: PropTypes.object.isRequired
};
