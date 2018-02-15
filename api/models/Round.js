import connection from '../lib/connection';

const Round = (() => {
    const _table = 'rounds';
    const _tableView = 'roundsView';
    const _label = 'Etappe';
    const _notFoundMsg = `${_label} nicht gefunden oder nicht geändert`;

    const _qSelect = `SELECT * FROM ${_tableView}`;
    const _qSelectOne = `${_qSelect} WHERE id = ?`;

    const _getFormattedResult = (result) => {
        const numRows = result.length;
        const tempObj = {};
        for (let i = 0; i < numRows; i++) {
            const roundId = result[i].id;
            if (!tempObj[roundId]) {
                tempObj[roundId] = {
                    id: result[i].id,
                    name: result[i].name,
                    firstMatchId: result[i].firstMatchId,
                    lastMatchId: result[i].lastMatchId,
                    dateStart: result[i].dateStart,
                    dateEnd: result[i].dateEnd
                };
            }
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
        getCurrentRound(req, res, next) {
            connection.acquire((error, con) => {
                // TODO: change this to now()
                // var dateNow = '2016-06-13 13:03:37';
                // var q = `SELECT * FROM ${_tableView}` + ' WHERE dateStart < \'' + dateNow + '\' AND dateEnd > \'' + dateNow + '\'';
                const q = `SELECT * FROM ${_tableView} WHERE dateStart < now() AND dateEnd > now()`;
                con.query(q, (err, result) => {
                    con.release();
                    if (err) {
                        res.status(400).send({ error: true, message: _notFoundMsg, data: err });
                    } else {
                        console.log('results', result);
                        let resultFormatted = { id: 0 };
                        if (result.length) {
                            [resultFormatted] = _getFormattedResult(result);
                        }
                        req.actualRound = resultFormatted;
                        if (typeof next === 'function') {
                            next();
                        } else {
                            const respOb = {
                                error: false,
                                message: '',
                                data: resultFormatted
                            };
                            res.send(respOb);
                        }
                    }
                });
            });
        },
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

module.exports = Round;
