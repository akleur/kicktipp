import connection from '../lib/connection';

const PenaltySurvey = (() => {
    const _table = 'penalty_survey';
    const _qSelect = `SELECT choice, count(*) AS count FROM ${_table} GROUP BY choice ORDER BY choice`;

    return {
        create(req, res) {
            connection.acquire((error, con) => {
                const q = `INSERT INTO ${_table} SET choice = ?, userId = ?`;
                const { penaltyrule } = req.body;
                con.query(q, [penaltyrule, req.userId], (err, result) => {
                    con.release();
                    if (err) {
                        let msg = '';
                        switch (err.code) {
                        case 'ER_DUP_ENTRY':
                            msg = 'Du hast schon eine Antwort abgegeben!';
                            break;
                        default:
                            msg = 'Fehler bei der Antwort Anlegen';
                            break;
                        }
                        res.status(400).send({ error: true, message: msg, data: err });
                    } else {
                        const respOb = {
                            error: false,
                            message: 'Antwort erfolgreich eingetragen',
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
                        res.status(400).send({ error: true, message: 'Fehler bei der Antworten Liste', data: err });
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
        }
    };
})();

module.exports = PenaltySurvey;
