import connection from '../lib/connection';

const Joker = (() => {
    const _table = 'jokers';
    const _tableView = 'jokersView';
    const _label = 'Joker';
    const _notFoundMsg = `${_label} nicht gefunden oder nicht geändert`;

    const _qSelect = `SELECT * FROM ${_tableView}`;
    const _qSelectOne = `${_qSelect} WHERE id = ?`;
    const _qSelectOneForUser = `${_qSelect} WHERE userId = ?`;

    return {
        create(req, res) {
            connection.acquire((error, con) => {
                const q = `INSERT INTO ${_table} SET ?, userId = ?`;
                con.query(q, [req.body, req.userId], (err, result) => {
                    con.release();
                    if (err) {
                        let msg = '';
                        switch (err.code) {
                        case 'ER_DUP_ENTRY':
                            msg = 'Joker ist schon da!';
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
        getOne(req, res) {
            connection.acquire((error, con) => {
                let q = '';
                let { id } = req.params || 0;
                if (req.params.id) {
                    q = _qSelectOne;
                }
                if (req.userId) {
                    q = _qSelectOneForUser;
                    id = req.userId;
                }
                con.query(q, [id], (err, result) => {
                    con.release();
                    if (err) {
                        res.status(400).send({ error: true, message: 'Fehler', data: err });
                    } else {
                        const respOb = {
                            error: false,
                            message: '',
                            data: {
                                resource: {}
                            }
                        };
                        if (result.length) {
                            respOb.data.resource = result[0];
                            res.send(respOb);
                        } else {
                            res.send(respOb);
                        }
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

module.exports = Joker;
