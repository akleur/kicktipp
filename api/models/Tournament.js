import connection from '../lib/connection';

const Tournament = (() => {
    const _tableView = 'tournamentView';
    const _label = 'Meisterschaft';
    const _notFoundMsg = `${_label} nicht gefunden oder nicht geändert`;

    const _qSelect = `SELECT * FROM ${_tableView}`;
    const _qSelectOne = `${_qSelect} WHERE id = ?`;

    return {
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
                const q = _qSelectOne;
                console.log(q);
                con.query(q, [req.params.id], (err, result) => {
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
        }
    };
})();

module.exports = Tournament;
