// Imports
import jwt from 'jsonwebtoken';
import Tournament from './models/Tournament';
import General from './models/General';
import User from './models/User';
import Team from './models/Team';
import Group from './models/Group';
import Match from './models/Match';
import Round from './models/Round';
import ChampionTip from './models/ChampionTip';
import Tip from './models/Tip';
import Joker from './models/Joker';
import UserHistory from './models/UserHistory';
import PenaltySurvey from './models/PenaltySurvey';

function requireRole(role) {
    return (req, res, next) => {
        const token = req.headers['x-access-token'];
        const request = req;
        if (token) {
            jwt.verify(token, 'ssshhhhh', (err, decoded) => {
                if (err) {
                    return res.status(400).send({ error: true, message: 'Token wurde nicht authentifiziert' });
                }
                req.tokenDecoded = decoded;
                if (role === 'admin') {
                    if (decoded.admin) {
                        request.isAdmin = true;
                        next();
                    } else {
                        return res.status(403).send({
                            error: true,
                            message: 'Admin Rechte benötigt!'
                        });
                    }
                }
                if (role === 'owner') {
                    req.userId = decoded.id;
                    if (req.body.userId) {
                        delete req.body.userId;
                    }
                    next();
                }
            });
        } else {
            return res.status(403).send({
                error: true,
                message: 'Kein Token geschickt'
            });
        }
    };
}

function getRound() {
    return (req, res, next) => {
        Round.getCurrentRound(req, res, next);
    };
}

function requireRound(roundIdStart) {
    return (req, res, next) => {
        if (req.actualRound.id >= roundIdStart) {
            next();
        } else {
            res.status(403).send({ error: true, message: 'Verboten! Zu früh?', data: '' });
        }
    };
}

function maxRound(roundIdEnd) {
    return (req, res, next) => {
        if (req.actualRound.id < roundIdEnd) {
            next();
        } else {
            res.status(403).send({ error: true, message: 'Verboten! Zu spät?', data: '' });
        }
    };
}

module.exports = {
    configure(app) {
        // General
        app.get('/api/version', (req, res) => {
            General.getVersion(req, res);
            res.send({ error: false, message: '', data: { version: '' } });
        });

        // Tournament
        app.get('/api/tournaments', (req, res) => {
            Tournament.getAll(req, res);
        });

        app.get('/api/tournaments/:id', (req, res) => {
            Tournament.getOne(req, res);
        });

        // Users
        app.post('/api/validatename', (req, res) => {
            User.validateName(req, res);
        });

        app.post('/api/authenticatetoken', (req, res) => {
            User.authenticatetoken(req, res);
        });

        app.post('/api/authenticate', (req, res) => {
            User.authenticate(req, res);
        });

        app.get('/api/users/admin', requireRole('admin'), (req, res) => {
            req.isAdmin = true;
            User.getAll(req, res);
        });

        app.post('/api/users/admin', requireRole('admin'), (req, res) => {
            User.create(req, res);
        });

        app.put('/api/users/admin', requireRole('admin'), (req, res) => {
            User.update(req, res);
        });

        app.delete('/api/users/admin/:id', requireRole('admin'), (req, res) => {
            User.delete(req, res);
        });

        app.post('/api/users', (req, res) => {
            User.create(req, res);
        });

        app.put('/api/users/me', requireRole('owner'), (req, res) => {
            User.changePassword(req, res);
        });

        app.get('/api/users', (req, res) => {
            User.getAll(req, res);
        });

        app.get('/api/users/:id', (req, res) => {
            User.getOne(req, res);
        });

        // UserHistory
        app.get('/api/userhistory', requireRole('admin'), (req, res) => {
            UserHistory.update(req, res);
        });

        // Teams
        app.get('/api/teams', (req, res) => {
            Team.getAll(req, res);
        });

        app.get('/api/teams/:id', (req, res) => {
            Team.getOne(req, res);
        });

        app.post('/api/teams', requireRole('admin'), (req, res) => {
            Team.create(req, res);
        });

        app.put('/api/teams', requireRole('admin'), (req, res) => {
            Team.update(req, res);
        });

        app.delete('/api/teams/:id', requireRole('admin'), (req, res) => {
            Team.delete(req, res);
        });

        // Groups
        app.get('/api/groups', (req, res) => {
            Group.getAll(req, res);
        });

        app.get('/api/groups/:id', (req, res) => {
            Group.getOne(req, res);
        });

        app.post('/api/groups', requireRole('admin'), (req, res) => {
            Group.create(req, res);
        });

        app.put('/api/groups', requireRole('admin'), (req, res) => {
            Group.update(req, res);
        });

        app.delete('/api/groups/:id', requireRole('admin'), (req, res) => {
            Group.delete(req, res);
        });

        // Matches
        app.get('/api/matches', (req, res) => {
            Match.getAll(req, res);
        });

        app.get('/api/matches/:id', (req, res) => {
            Match.getOne(req, res);
        });

        app.post('/api/matches', requireRole('admin'), (req, res) => {
            Match.update(req, res);
        });

        // Rounds
        app.get('/api/rounds/current', (req, res) => {
            Round.getCurrentRound(req, res);
        });

        // TODO: get first and last matches (or all matches?)
        app.get('/api/rounds', (req, res) => {
            Round.getAll(req, res);
        });

        app.get('/api/rounds/:id', (req, res) => {
            Round.getOne(req, res);
        });

        app.post('/api/rounds', requireRole('admin'), (req, res) => {
            Round.create(req, res);
        });

        app.put('/api/rounds', requireRole('admin'), (req, res) => {
            Round.update(req, res);
        });

        app.delete('/api/rounds/:id', requireRole('admin'), (req, res) => {
            Round.delete(req, res);
        });

        // ChampionTips
        app.get('/api/championtips/me', requireRole('owner'), (req, res) => {
            ChampionTip.getOne(req, res);
        });

        app.post('/api/championtips/me', requireRole('owner'), getRound(), maxRound(1), (req, res) => {
            ChampionTip.create(req, res);
        });

        app.put('/api/championtips/me', requireRole('owner'), getRound(), maxRound(1), (req, res) => {
            ChampionTip.update(req, res);
        });

        app.delete('/api/championtips/me', requireRole('owner'), getRound(), maxRound(1), (req, res) => {
            ChampionTip.delete(req, res);
        });

        app.get('/api/championtips/grouped', getRound(), requireRound(0), (req, res) => {
            ChampionTip.getAllGrouped(req, res);
        });

        app.get('/api/championtips', getRound(), requireRound(1), (req, res) => {
            ChampionTip.getAll(req, res);
        });

        app.get('/api/championtips/:id', getRound(), requireRound(1), (req, res) => {
            ChampionTip.getOne(req, res);
        });

        app.get('/api/championtips/user/:userId', getRound(), requireRound(1), (req, res) => {
            ChampionTip.getOne(req, res);
        });

        // Tips
        // TODO: unique constraint in mysql
        app.get('/api/tips/me', requireRole('owner'), (req, res) => {
            Tip.getAllForUser(req, res);
        });

        app.post('/api/tips/me', getRound(), requireRole('owner'), (req, res) => {
            Tip.create(req, res);
        });

        app.put('/api/tips/me', getRound(), requireRole('owner'), (req, res) => {
            Tip.update(req, res);
        });

        app.delete('/api/tips/me/:id', requireRole('owner'), (req, res) => {
            Tip.delete(req, res);
        });

        app.get('/api/tips', (req, res) => {
            Tip.getAll(req, res);
        });

        app.get('/api/tips/:id', (req, res) => {
            Tip.getOne(req, res);
        });

        app.get('/api/tips/user/:userId', (req, res) => {
            Tip.getAll(req, res);
        });

        app.get('/api/tips/match/:matchId', (req, res) => {
            Tip.getAll(req, res);
        });

        // Jokers
        app.get('/api/jokers/me', requireRole('owner'), (req, res) => {
            Joker.getOne(req, res);
        });

        app.post('/api/jokers/me', requireRole('owner'), (req, res) => {
            Joker.create(req, res);
        });

        app.put('/api/jokers/me', requireRole('owner'), (req, res) => {
            Joker.update(req, res);
        });

        app.delete('/api/jokers/me/:id', requireRole('owner'), (req, res) => {
            Joker.delete(req, res);
        });

        app.get('/api/jokers', (req, res) => {
            Joker.getAll(req, res);
        });

        app.get('/api/jokers/:id', (req, res) => {
            Joker.getOne(req, res);
        });

        app.get('/api/jokers/user/:userId', (req, res) => {
            Joker.getOne(req, res);
        });

        // Penalty Survey
        app.get('/api/penaltysurvey', (req, res) => {
            PenaltySurvey.getAll(req, res);
        });

        app.post('/api/penaltysurvey', requireRole('owner'), (req, res) => {
            PenaltySurvey.create(req, res);
        });
    }
};
