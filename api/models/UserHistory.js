import connection from '../lib/connection';
import { dynamicSortMultiple } from '../lib/arrayUtils';

const UserHistory = (() => {
    const _table = 'user_history';
    const _tableMatches = 'matches';
    const _tableUsers = 'users';
    const _tableTips = 'tipsView';

    let response = '';
    let matchList = [];
    let userList = [];
    let tipList = [];

    const errorMsg = 'Error beim User History';

    function filterTipsPerUser(tipListForMatch, userId) {
        return tipListForMatch.filter(tip => tip.userId === userId);
    }

    function filterTipsPerMatch(matchId) {
        return tipList.filter(tip => tip.matchId === matchId);
    }

    function dbInsert(totalUserListArray, res, con) {
        // DB insert
        totalUserListArray.reverse();
        const totalUserListArrayFiltered = totalUserListArray.slice(0, 3);
        let matchCount = totalUserListArrayFiltered.length;
        console.log('matchCount', matchCount);

        totalUserListArrayFiltered.forEach((sortedUserList) => {
            console.log('matchCount in loop', matchCount);
            const userListLen = sortedUserList.length;
            let userCounter = 0;

            sortedUserList.forEach((history) => {
                console.log('UserHistory insert into db each begin', new Date());
                if (history.userId === '130') {
                    console.log('UserHistory ', history);
                }
                const qUserhistory = `INSERT INTO ${_table} SET ?`;
                con.query(qUserhistory, [history], (err) => {
                    if (err) {
                        con.release();
                        console.log('Error beim createUserHistory');
                        res.status(400).send({ error: true, message: `${errorMsg} createUserHistory`, data: err });
                    } else {
                        userCounter++;
                        if (userCounter === userListLen) {
                            console.log(`Match nr ${matchCount} fertig ${new Date()}`);
                            matchCount--;
                            if (matchCount === 0) {
                                con.destroy();
                                console.log('Alles fertig');
                                console.log('createUserHistory end', new Date());
                                res.status(200).send({
                                    error: false,
                                    message: 'User history wurde aktualisiert',
                                    data: ''
                                });
                            }
                        }
                    }
                });
            });
        });
    }

    function createUserHistory(res, con) {
        console.log('createUserHistory begin', new Date());
        const UserHistoryPerMatch = {};
        let totalUserListArray = [];

        userList.forEach((user) => {
            UserHistoryPerMatch[user.id] = {
                spielNr: 0,
                rank: 0,
                oldRank: 0,
                trend: 0,
                points: 0,
                tips4er: 0,
                tips2er: 0,
                tips1er: 0
            };
        });

        matchList.forEach((match) => {
            const tipListForMatch = filterTipsPerMatch(match.id);
            if (tipListForMatch.length > 0) {
                userList.forEach((user) => {
                    UserHistoryPerMatch[user.id].spielNr = match.nr;
                    UserHistoryPerMatch[user.id].oldRank = UserHistoryPerMatch[user.id].rank;
                    const tipForUser = filterTipsPerUser(tipListForMatch, user.id);
                    if (tipForUser.length > 0) {
                        const tip = tipForUser[0];
                        // 4er Tip
                        if (tip.tipTeamA === match.goalsTeamA && tip.tipTeamB === match.goalsTeamB) {
                            UserHistoryPerMatch[user.id].tips4er++;
                            UserHistoryPerMatch[user.id].points += 4;
                            if (tip.joker > 0) {
                                UserHistoryPerMatch[user.id].points += 8;
                            }
                        } else if ((tip.tipTeamA - tip.tipTeamB) === (match.goalsTeamA - match.goalsTeamB)) {
                            // 2er Tip
                            UserHistoryPerMatch[user.id].tips2er++;
                            UserHistoryPerMatch[user.id].points += 2;
                            if (tip.joker > 0) {
                                UserHistoryPerMatch[user.id].points += 4;
                            }
                        } else if ((tip.tipTeamA > tip.tipTeamB && match.goalsTeamA > match.goalsTeamB) ||
                                (tip.tipTeamB > tip.tipTeamA && match.goalsTeamB > match.goalsTeamA)) {
                            // 1er Tip
                            UserHistoryPerMatch[user.id].tips1er++;
                            UserHistoryPerMatch[user.id].points += 1;
                            if (tip.joker > 0) {
                                UserHistoryPerMatch[user.id].points += 2;
                            }
                        }
                    }
                });
            }

            // Calculate rank
            const UserHistoryPerMatchArray = [];
            Object.keys(UserHistoryPerMatch).forEach((userId) => {
                UserHistoryPerMatch[userId].userId = userId;
                UserHistoryPerMatchArray.push(UserHistoryPerMatch[userId]);
            });

            const fields = ['-points', '-tips4er', '-tips2er', '-tips1er'];
            const UserHistoryPerMatchArrayCopy = UserHistoryPerMatchArray.slice(0);
            const sortedUserList = UserHistoryPerMatchArrayCopy.sort(dynamicSortMultiple.apply(this, fields));

            for (let i = 0, len = sortedUserList.length; i < len; i++) {
                if (i > 0) {
                    if (sortedUserList[i].points === sortedUserList[i - 1].points) {
                        if (sortedUserList[i].tips4er === sortedUserList[i - 1].tips4er && sortedUserList[i].tips2er === sortedUserList[i - 1].tips2er && sortedUserList[i].tips1er === sortedUserList[i - 1].tips1er) {
                            sortedUserList[i].rank = sortedUserList[i - 1].rank;
                        } else {
                            sortedUserList[i].rank = i + 1;
                        }
                    } else {
                        sortedUserList[i].rank = i + 1;
                    }
                } else {
                    sortedUserList[i].rank = 1;
                }

                // Calculate trend
                if (sortedUserList[i].oldRank === 0) {
                    sortedUserList[i].trend = 0;
                } else {
                    const rankDiff = sortedUserList[i].rank - sortedUserList[i].oldRank;
                    if (rankDiff > 0) {
                        sortedUserList[i].trend = -1;
                    } else if (rankDiff === 0) {
                        sortedUserList[i].trend = 0;
                    } else {
                        sortedUserList[i].trend = 1;
                    }
                }
            }

            const sortedUserListCopy = JSON.parse(JSON.stringify(sortedUserList));
            totalUserListArray.push(sortedUserListCopy);
        });

        dbInsert(totalUserListArray, res, con);
    }

    function deletePartOfUserHistory(res, con) {
        const lastMatchNr = matchList.length - 3;
        console.log('lastMatchNr', lastMatchNr);
        const qUserhistory = `DELETE FROM ${_table} WHERE spielNr >= ${lastMatchNr}`;
        console.log('q_userhistory', qUserhistory);
        con.query(qUserhistory, (err) => {
            if (err) {
                con.release();
                console.log('Error beim deleteUserHistory');
                res.status(400).send({ error: true, message: `${errorMsg} deletePartOfUserHistory`, data: err });
            } else {
                createUserHistory(res, con);
            }
        });
    }

    function getTipList(res, con) {
        const qTips = `SELECT * FROM ${_tableTips}`;
        con.query(qTips, (err, tips) => {
            if (err) {
                con.release();
                console.log('Error beim getTipList', qTips);
                res.status(400).send({ error: true, message: `${errorMsg} getTipList`, data: err });
            }
            if (tips.length) {
                response += 'tipps liste geholt. ';
                tipList = tips;
                deletePartOfUserHistory(res, con);
            }
        });
    }

    function getUserList(res, con) {
        const qUsers = `SELECT id, username FROM ${_tableUsers} WHERE status = "active"`;
        con.query(qUsers, (err, users) => {
            if (err) {
                con.release();
                console.log('Error beim getUserList');
                res.status(400).send({ error: true, message: `${errorMsg} getUserList`, data: err });
            }
            if (users.length) {
                response += 'user liste geholt. ';
                users.forEach((user) => {
                    const userObj = {
                        id: user.id,
                        username: user.username
                    };
                    userList.push(userObj);
                });
                getTipList(res, con);
            }
        });
    }

    function getMatchList(res, con) {
        const qMatches = `SELECT id, date, goalsTeamA, goalsTeamB FROM ${_tableMatches} WHERE goalsTeamA > -1 AND goalsTeamB > -1 ORDER BY date`;
        con.query(qMatches, (err, matches) => {
            if (err) {
                con.release();
                console.log('Error beim getMatchList');
                res.status(400).send({ error: true, message: `${errorMsg} getMatchList`, data: err });
            }
            if (matches.length) {
                let matchNr = 1;

                matches.forEach((match) => {
                    const matchObj = {
                        id: match.id,
                        nr: matchNr,
                        date: match.date,
                        goalsTeamA: match.goalsTeamA,
                        goalsTeamB: match.goalsTeamB
                    };
                    matchList.push(matchObj);
                    matchNr++;
                });
                getUserList(res, con);
            }
        });
    }

    return {
        update(req, res) {
            matchList = [];
            userList = [];
            tipList = [];
            connection.acquire((err, con) => {
                if (err) {
                    con.release();
                    console.log('Error beim userhistory connection');
                    res.status(400).send({ error: true, message: `${errorMsg} connection`, data: err });
                } else {
                    getMatchList(res, con);
                }
            });
        }
    };
})();

module.exports = UserHistory;
