import connection from '../lib/connection';

const Tip = (() => {
    const _table = 'tips';
    const _tableView = 'tipsView';
    const _label = 'Tipp';
    const _notFoundMsg = `${_label} nicht gefunden oder nicht geändert`;

    const _qSelect = `SELECT * FROM ${_tableView}`;
    const _qSelectOwn = _qSelect;
    const _qSelectPast = `${_qSelect} WHERE matchDate < now()`;

    const _qSelectOne = `${_qSelectPast} AND id = ?`;
    const _qSelectForUser = `${_qSelectOwn} WHERE userId = ?`;
    const _qSelectForMatch = `${_qSelectPast} AND matchId = ? ORDER BY username`;
    const _qSelectForOtherUser = `${_qSelectPast} AND userId = ? ORDER BY matchDate`;

    function insertTipsDone(req, res) {
        let msg = `${req.tips.count} Tip(s) wurde(n) geschickt. `;
        if (req.tips.inserted) {
            msg += `${req.tips.inserted} Tip(s) wurde(n) erstellt. `;
        }
        if (req.tips.updated) {
            msg += `${req.tips.updated} Tip(s) wurde(n) aktualisiert. `;
        }
        if (req.tips.deleted) {
            msg += `${req.tips.deleted} Tip(s) wurde(n) gelöscht. `;
        }
        if (req.tips.failed) {
            msg += `${req.tips.failed} Tip(s) wurde(n) nicht behandelt. `;
        }

        const respOb = {
            error: false,
            message: msg
        };
        res.send(respOb);
    }

    function checkIfInsertTipDone(req, res, con) {
        req.tips.processed++;
        if (req.tips.processed === req.tips.count) {
            console.log('finished post');
            con.release();
            insertTipsDone(req, res);
        }
    }

    return {
        create(req, res) {
            console.log('body: ', req.body);
            if (req.body.tips.length) {
                req.tips = {};
                req.tips.count = req.body.tips.length;
                req.tips.processed = 0;
                req.tips.inserted = 0;
                req.tips.updated = 0;
                req.tips.deleted = 0;
                req.tips.failed = 0;
                req.body.tips.forEach((elem) => {
                    connection.acquire((error, con) => {
                        const q = `SELECT id as tippId, (matchDate > now()) AS dateFlag FROM ${_tableView} WHERE matchId = ? AND userId = ?`;
                        con.query(q, [elem.matchId, req.userId], (err1, result) => {
                            if (err1) {
                                con.release();
                            }
                            if (result.length) {
                                if (parseInt(result[0].dateFlag, 10) === 0) {
                                    req.tips.updated++;
                                    checkIfInsertTipDone(req, res, con);
                                } else if (parseInt(elem.tipTeamA, 10) === -1 || parseInt(elem.tipTeamB, 10) === -1) {
                                    console.log('tip to be deleted');
                                    const q2 = `DELETE FROM ${_table} WHERE id= ?`;
                                    con.query(q2, [result[0].tippId], (err2) => {
                                        if (err2) {
                                            req.tips.failed++;
                                        } else {
                                            req.tips.deleted++;
                                        }
                                        checkIfInsertTipDone(req, res, con);
                                    });
                                } else {
                                    const q3 = `UPDATE ${_table} SET ? WHERE id= ? `;
                                    con.query(q3, [elem, result[0].tippId], (err3) => {
                                        if (err3) {
                                            req.tips.failed++;
                                        } else {
                                            req.tips.updated++;
                                        }
                                        checkIfInsertTipDone(req, res, con);
                                    });
                                }
                            } else if (parseInt(elem.tipTeamA, 10) > -1 && parseInt(elem.tipTeamB, 10) > -1) {
                                const q4 = `INSERT INTO ${_table} SET ?, userId = ?`;
                                con.query(q4, [elem, req.userId], (err4) => {
                                    if (err4) {
                                        req.tips.failed++;
                                    } else {
                                        req.tips.inserted++;
                                    }
                                    checkIfInsertTipDone(req, res, con);
                                });
                            } else {
                                req.tips.failed++;
                                checkIfInsertTipDone(req, res, con);
                            }
                        });
                    });
                });
            }
        },
        getAllForUser(req, res) {
            connection.acquire((error, con) => {
                if (!req.userId) {
                    res.status(400).send({ error: true, message: 'Keine berechtigte Benutzer!', data: '' });
                }
                const id = req.userId;
                con.query(_qSelectForUser, [id], (err, result) => {
                    console.log('after q', result);
                    con.release();
                    if (err) {
                        res.status(400).send({ error: true, message: `Fehler bei der ${_label} Liste`, data: err });
                    } else {
                        const respOb = {
                            error: false,
                            message: '',
                            data: {
                                count: result.length,
                                items: result
                            }
                        };
                        res.send(respOb);
                    }
                });
            });
        },
        getAll(req, res) {
            connection.acquire((error, con) => {
                let q = _qSelectPast;
                let id = 0;
                if (req.params.userId) {
                    q = _qSelectForOtherUser;
                    id = req.params.userId;
                }
                if (req.params.matchId) {
                    q = _qSelectForMatch;
                    id = req.params.matchId;
                }
                con.query(q, [id], (err, result) => {
                    con.release();
                    if (err) {
                        res.status(400).send({ error: true, message: `Fehler bei der ${_label} Liste`, data: err });
                    } else {
                        const respOb = {
                            error: false,
                            message: '',
                            data: {
                                count: result.length,
                                items: result
                            }
                        };
                        if (req.params.userId) {
                            respOb.data.userId = req.params.userId;
                        }
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
            connection.acquire((error, con) => {
                const q = `UPDATE ${_table} SET ? WHERE id = ? AND userId= ?`;
                const { id } = req.body;
                delete req.body.id;
                con.query(q, [req.body, id, req.userId], (err, result) => {
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
                const q = `DELETE FROM ${_table} WHERE id = ? AND userId= ?`;
                con.query(q, [req.params.id, req.userId], (err, result) => {
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

module.exports = Tip;
