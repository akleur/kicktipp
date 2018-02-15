import connection from '../lib/connection';

const Group = (() => {
    const _table = 'groups';
    const _tableView = 'groupsView';
    const _label = 'Gruppe';
    const _notFoundMsg = `${_label} nicht gefunden oder nicht geändert`;
    const _qSelect = `SELECT * FROM ${_tableView}`;
    const _qSelectOne = `${_qSelect} WHERE id = ?`;

    const _getFormattedResult = (result) => {
        const numRows = result.length;
        const tempObj = {};
        for (let i = 0; i < numRows; i++) {
            const {
                id,
                date,
                name,
                matchId,
                roundId,
                roundName,
                groupName,
                teamAId,
                teamAName,
                teamACountryCode,
                teamALabel,
                teamBId,
                teamBName,
                teamBCountryCode,
                teamBLabel,
                goalsTeamA,
                goalsTeamB
            } = result[i];

            if (!tempObj[id]) {
                tempObj[id] = {
                    id,
                    name,
                    teams: [],
                    matches: []
                };
            }

            const tempArr = tempObj[id].teams.filter(team => team.id === teamAId);

            if (!tempArr.length) {
                const teamsObj = {
                    id: teamAId,
                    name: teamAName,
                    countryCode: teamACountryCode
                };
                tempObj[id].teams.push(teamsObj);
            }

            const matchObj = {
                id: matchId,
                date,
                roundId,
                roundName,
                groupName,
                teamA: {
                    id: teamAId,
                    name: teamAName || teamALabel,
                    countryCode: teamACountryCode,
                    goals: goalsTeamA
                },
                teamB: {
                    id: teamBId,
                    name: teamBName || teamBLabel,
                    countryCode: teamBCountryCode,
                    goals: goalsTeamB
                }
            };
            tempObj[id].matches.push(matchObj);
        }
        const resultFormatted = [];
        Object.keys(tempObj).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(tempObj, key)) {
                resultFormatted.push(tempObj[key]);
            }
        });

        return resultFormatted;
    };

    return {
        create(req, res) {
            connection.acquire((error, con) => {
                const q = `INSERT INTO ${_table} SET ?`;
                con.query(q, [req.body], (err, result) => {
                    con.release();
                    if (err) {
                        let msg = '';
                        switch (err.code) {
                        case 'ER_DUP_ENTRY':
                            msg = 'Benutzername schon vergeben';
                            break;
                        default:
                            msg = `Fehler beim ${_label} Anlegen`;
                            break;
                        }
                        res.status(400).send({ error: true, message: msg, data: err });
                    } else {
                        const respOb = {
                            error: false,
                            message: `${_label} erfolgreich angelegt`,
                            data: {
                                insertedId: result.insertId
                            }
                        };
                        res.send(respOb);
                    }
                });
            });
        },
        getAll(req, res) {
            connection.acquire((error, con) => {
                con.query(_qSelect, (err, result) => {
                    con.release();
                    if (err) {
                        res.status(400).send({ error: true, message: `Fehler bei der ${_label} Liste`, data: err });
                    } else {
                        const resultFormatted = _getFormattedResult(result);
                        const respOb = {
                            error: false,
                            message: '',
                            data: {
                                count: resultFormatted.length,
                                items: resultFormatted
                            }
                        };
                        res.send(respOb);
                    }
                });
            });
        },
        getOne(req, res) {
            connection.acquire((error, con) => {
                const q = _qSelectOne;
                console.log(q);
                con.query(q, [req.params.id], (err, result) => {
                    con.release();
                    if (err) {
                        res.status(400).send({ error: true, message: 'Fehler', data: err });
                    } else if (result.length) {
                        const resultFormatted = _getFormattedResult(result);
                        const respOb = {
                            error: false,
                            message: '',
                            data: {
                                resource: resultFormatted[0]
                            }
                        };
                        res.send(respOb);
                    } else {
                        res.status(404).send({ error: true, message: _notFoundMsg, data: err });
                    }
                });
            });
        },
        update(req, res) {
            connection.acquire((error, con) => {
                const q = `UPDATE ${_table} SET ? WHERE id = ?`;
                con.query(q, [req.body, req.body.id], (err, result) => {
                    con.release();
                    if (err) {
                        res.status(400).send({
                            error: true,
                            message: `Fehler beim ${_label} aktualisieren`,
                            data: err
                        });
                    } else if (result.affectedRows) {
                        const respOb = {
                            error: false,
                            message: `${_label} erfolgreich aktualisiert`,
                            data: result
                        };
                        res.send(respOb);
                    } else {
                        res.status(404).send({ error: true, message: _notFoundMsg, data: result });
                    }
                });
            });
        },
        delete(req, res) {
            connection.acquire((error, con) => {
                const q = `DELETE FROM ${_table} WHERE id = ?`;
                con.query(q, [req.params.id], (err, result) => {
                    con.release();
                    if (err) {
                        res.status(400).send({ error: true, message: `Fehler beim ${_label} löschen`, data: err });
                    } else if (result.affectedRows) {
                        const respOb = {
                            error: false,
                            message: `${_label} erfolgreich gelöscht`,
                            data: result
                        };
                        res.send(respOb);
                    } else {
                        res.status(404).send({ error: true, message: _notFoundMsg, data: result });
                    }
                });
            });
        }
    };
})();

module.exports = Group;
