import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import connection from '../lib/connection';

const sendRegisterMail = (newUser) => {
    // Enter mail server credentials here
    const transporter = nodemailer.createTransport(smtpTransport({
        host: 'mail.yourserver.com',
        port: 587,
        secure: false,
        tls: { rejectUnauthorized: false },
        debug: true,
        auth: {
            user: 'mailuser',
            pass: 'mailpasswd'
        }
    }));

    const hasMastertip = (parseInt(newUser.mastertip, 10) === 1) ? 'Ja' : 'Nein';
    const SumToPay = (parseInt(newUser.mastertip, 10) === 1) ? '15' : '10';
    const registerMailText = `Hi ${newUser.username},

fett dass du am Kicktipp teilnimmst.
Folgende Daten hast du uns mitgeschickt:

Benutzername: ${newUser.username}
Email: ${newUser.email}
Password: **** (ist verschlüsselt abgelegt)
Eingeladen von: ${newUser.invitation}
Meisterschaftstip: ${hasMastertip}

Wenn du Kummer hast, schicke eine Email an folgende Adresse: kicktipp@schwuppdiwupp.net.

Grüße von der Kicktipp - Elf 
`;

    const mailOptions = {
        from: 'Kicktipp <kicktipp@schwuppdiwupp.net>',
        to: newUser.email,
        bcc: 'kicktipp@schwuppdiwupp.net, akleur007@gmail.com',
        subject: 'Kicktipp - Deine Registrierung',
        text: registerMailText
    };

    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log('Error nodemailer', error);
        } else {
            console.log('Message sent: ', response);
        }
    });
};

const User = (() => {
    const _table = 'users';
    const _tableView = 'userView';
    const _visibleFields = ['id', 'username', 'status', 'mastertip'];
    const _visibleFieldsAdmin = ['email', 'password'];
    const _label = 'Benutzer';
    const _notFoundMsg = `${_label} nicht gefunden oder Benutzername / Passwort falsch`;
    const _adminErrorMsg = 'Noooo! Admin User anlegen / updaten verboten!';
    const _statusErrorMsg = 'Noooo! Status setzen beim User anlegen verboten!';
    const _mastertipErrorMsg = 'Noooo! Meistertipp kann nicht geändert werden!';
    const _tokenNoAuthErrorMsg = 'Token wurde nicht authentifiziert, bitte nochmal einloggen';

    const _qSelectAdmin = `SELECT ${_visibleFields.join(',')}, ${_visibleFieldsAdmin.join(',')} FROM ${_table}`;
    const _qSelectAllAdmin = `${_qSelectAdmin} ORDER BY id DESC`;
    const _qSelectAll = `SELECT * FROM ${_tableView} ORDER BY rank, username`;
    const _qSelectActive = `SELECT ${_visibleFields.join(',')} FROM ${_table} WHERE status = "active"`;
    const _qSelectOne = `${_qSelectActive} AND id = ?`;
    const _qSelectOnePerUsername = `${_qSelectAdmin} WHERE username = ?`;
    const _qSelectForAuth = `SELECT ${_visibleFields.join(',')}, password, admin FROM ${_table}`;
    const _qSelectOneForAuth = `${_qSelectForAuth} WHERE username = ? AND password = ? AND status = "active"`;


    return {
        validateName(req, res) {
            console.log('req.body', req.body);
            connection.acquire((error, con) => {
                con.query(_qSelectOnePerUsername, [req.body.username], (err, result) => {
                    con.release();
                    if (err) {
                        res.status(400).send({ error: true, message: 'Fehler', data: err });
                    } else if (result.length) {
                        const respOb = {
                            error: false,
                            message: '',
                            data: {
                                msg: 'Benutzername schon vergeben'
                            }
                        };
                        res.status(400).send(respOb);
                    } else {
                        res.status(200).send({ error: false, message: '', data: {} });
                    }
                });
            });
        },
        authenticatetoken(req, res) {
            const { token } = req.body;
            console.log('authenticate token called');
            if (token) {
                jwt.verify(token, 'ssshhhhh', (errorToken, decoded) => {
                    if (errorToken) {
                        return res.status(200).send({ error: false, message: '', data: errorToken });
                    }
                    req.tokenDecoded = decoded;
                    console.log('decoded', decoded);

                    if (decoded.username && decoded.password) {
                        connection.acquire((error, con) => {
                            con.query(_qSelectOneForAuth, [decoded.username, decoded.password], (err, result) => {
                                con.release();
                                if (err) {
                                    res.status(400).send({ error: true, message: 'Fehler', data: err });
                                } else if (result.length) {
                                    const user = {
                                        id: result[0].id,
                                        username: result[0].username,
                                        password: result[0].password,
                                        mastertip: result[0].mastertip,
                                        admin: result[0].admin
                                    };
                                    if (!user.id || !user.username) {
                                        res.status(400).send({
                                            error: true,
                                            message: 'Fehler. Falsche Benutzername und / oder Passwort'
                                        });
                                    } else {
                                        jwt.sign(user, 'ssshhhhh', {
                                            expiresIn: '60d'
                                        }, (errorToken, token2) => {
                                            delete user.password;
                                            const respOb = {
                                                error: false,
                                                message: '',
                                                data: {
                                                    user,
                                                    token: token2,
                                                    errorToken
                                                }
                                            };
                                            res.send(respOb);
                                        });
                                    }
                                } else {
                                    res.status(404).send({ error: true, message: _notFoundMsg, data: err });
                                }
                            });
                        });
                    } else {
                        return res.status(400).send({ error: true, message: _tokenNoAuthErrorMsg });
                    }
                });
            } else {
                return res.status(403).send({
                    error: true,
                    message: 'Kein Token geschickt'
                });
            }
        },
        authenticate(req, res) {
            const { username } = req.body;
            const password = crypto
                .createHash('sha1')
                .update(req.body.password)
                .digest('base64');
            connection.acquire((error, con) => {
                con.query(_qSelectOneForAuth, [username, password], (err, result) => {
                    con.release();
                    if (err) {
                        res.status(400).send({ error: true, message: 'Fehler', data: err });
                    } else if (result.length) {
                        const user = {
                            id: result[0].id,
                            username: result[0].username,
                            password: result[0].password,
                            mastertip: result[0].mastertip,
                            admin: result[0].admin
                        };
                        if (user.password !== password || user.username !== username) {
                            res.status(400).send({
                                error: true,
                                message: 'Fehler. Falsche Benutzername und / oder Passwort'
                            });
                        } else {
                            jwt.sign(user, 'ssshhhhh', {
                                expiresIn: 21600
                            }, (errorToken, token) => {
                                delete user.password;
                                const respOb = {
                                    error: false,
                                    message: '',
                                    data: {
                                        user,
                                        token,
                                        errorToken
                                    }
                                };
                                res.send(respOb);
                            });
                        }
                    } else {
                        res.status(404).send({ error: true, message: _notFoundMsg, data: err });
                    }
                });
            });
        },
        create(req, res) {
            if (!req.isAdmin) {
                if (req.body.admin) {
                    res.status(403).send({ error: true, message: _adminErrorMsg });
                }
                if (req.body.status) {
                    res.status(403).send({ error: true, message: _statusErrorMsg });
                }
            }
            connection.acquire((error, con) => {
                const q = `INSERT INTO ${_table} SET ?`;
                req.body.password = crypto
                    .createHash('sha1')
                    .update(req.body.password)
                    .digest('base64');
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
                        const newUser = req.body;
                        sendRegisterMail(newUser);
                        newUser.id = result.insertId;
                        newUser.status = 'registered';
                        const respOb = {
                            error: false,
                            message: `${_label} erfolgreich angelegt`,
                            data: newUser
                        };
                        res.send(respOb);
                    }
                });
            });
        },
        getAll(req, res) {
            connection.acquire((error, con) => {
                let q = '';
                if (req.isAdmin) {
                    q = _qSelectAllAdmin;
                } else {
                    q = _qSelectAll;
                }

                con.query(q, (err, result) => {
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
            if (!req.isAdmin) {
                if (req.body.admin) {
                    res.status(403).send({ error: true, message: _adminErrorMsg });
                }
                if (req.body.mastertip) {
                    res.status(403).send({ error: true, message: _mastertipErrorMsg });
                }
            }
            connection.acquire((error, con) => {
                const q = `UPDATE ${_table} SET ? WHERE id = ?`;
                const { id } = req.body;
                delete req.body.id;
                if (req.body.password) {
                    req.body.password = crypto
                        .createHash('sha1')
                        .update(req.body.password)
                        .digest('base64');
                }
                con.query(q, [req.body, id], (err, result) => {
                    con.release();
                    if (err) {
                        let msg = '';
                        switch (err.code) {
                        case 'ER_DUP_ENTRY':
                            msg = 'Benutzername schon vergeben';
                            break;
                        default:
                            msg = `Fehler beim ${_label} aktualisieren`;
                            break;
                        }
                        res.status(400).send({ error: true, message: msg, data: err });
                    } else if (result.affectedRows) {
                        const respOb = {
                            error: false,
                            message: `${_label} erfolgreich aktualisiert`,
                            data: result,
                            id
                        };
                        res.send(respOb);
                    } else {
                        res.status(404).send({ error: true, message: _notFoundMsg, data: result });
                    }
                });
            });
        },
        changePassword(req, res) {
            if (!req.body.password) {
                res.status(403).send({ error: true, message: _adminErrorMsg });
            }
            connection.acquire((error, con) => {
                const q = `UPDATE ${_table} SET password = ? WHERE id = ?`;
                const id = req.userId;
                if (req.body.password) {
                    req.body.password = crypto
                        .createHash('sha1')
                        .update(req.body.password)
                        .digest('base64');
                }
                con.query(q, [req.body.password, id], (err, result) => {
                    con.release();
                    if (err) {
                        let msg = '';
                        switch (err.code) {
                        case 'ER_DUP_ENTRY':
                            msg = 'Benutzername schon vergeben';
                            break;
                        default:
                            msg = `Fehler beim ${_label} aktualisieren`;
                            break;
                        }
                        res.status(400).send({ error: true, message: msg, data: err });
                    } else if (result.affectedRows) {
                        const respOb = {
                            error: false,
                            message: `${_label} erfolgreich aktualisiert`,
                            data: result,
                            password: req.body.password
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

module.exports = User;
