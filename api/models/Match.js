import connection from '../lib/connection';

const Match = (() => {
    const _table = 'matches';
    const _tableView = 'matchesView';
    const _label = 'Spiel';
    const _notFoundMsg = `${_label} nicht gefunden oder nicht geändert`;
    const _qSelect = `SELECT * FROM ${_tableView}`;
    const _qSelectOne = `${_qSelect} WHERE id = ?`;

    function insertScoresDone(req, res) {
        let msg = `${req.scores.count} Ergebnisse(s) wurde(n) geschickt. `;
        if (req.scores.updated) {
            msg += `${req.scores.updated} Ergebnisse(s) wurde(n) aktualisiert. `;
        }
        if (req.scores.failed) {
            msg += `${req.scores.failed} Ergebnisse(s) wurde(n) nicht behandelt. `;
        }
        const respOb = {
            error: false,
            message: msg
        };
        res.send(respOb);
    }

    function checkIfInsertScoreDone(req, res, con) {
        req.scores.processed++;
        if (req.scores.processed === req.scores.count) {
            console.log('finished scores insert');
            con.release();
            insertScoresDone(req, res);
        }
    }

    return {
        getAll(req, res) {
            connection.acquire((error, con) => {
                const q = `${_qSelect} ORDER BY date`;
                con.query(q, (err, result) => {
                    con.release();
                    if (err) {
                        res.status(400).send({ error: true, message: `Fehler bei der ${_label} Liste`, data: err });
                    } else {
                        const resultFormatted = result.map((row) => {
                            const {
                                id,
                                date,
                                roundId,
                                roundName,
                                groupName,
                                teamAId,
                                teamAName,
                                teamALabel,
                                teamACountryCode,
                                goalsTeamA,
                                teamBId,
                                teamBName,
                                teamBLabel,
                                teamBCountryCode,
                                goalsTeamB
                            } = row;

                            return {
                                id,
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
                        });
                        const respOb = {
                            error: false,
                            message: '',
                            data: {
                                count: result.length,
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
                con.query(_qSelectOne, [req.params.id], (err, result) => {
                    con.release();
                    if (err) {
                        res.status(400).send({ error: true, message: 'Fehler', data: err });
                    } else if (result.length) {
                        const respOb = {
                            error: false,
                            message: '',
                            data: {
                                resource: result[0]
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
            if (req.body.scores.length) {
                req.scores = {};
                req.scores.count = req.body.scores.length;
                req.scores.processed = 0;
                req.scores.updated = 0;
                req.scores.failed = 0;

                req.body.scores.forEach((elem) => {
                    connection.acquire((error, con) => {
                        const q = `UPDATE ${_table} SET goalsTeamA=?,  goalsTeamB=? WHERE id= ?`;
                        con.query(q, [elem.goalsA, elem.goalsB, elem.matchId], (err) => {
                            if (err) {
                                req.scores.failed++;
                            } else {
                                req.scores.updated++;
                            }
                            checkIfInsertScoreDone(req, res, con);
                        });
                    });
                });
            }
        }
    };
})();

module.exports = Match;
