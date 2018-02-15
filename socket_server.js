import express from 'express';
import http from 'http';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import SocketIo from 'socket.io';
import mongoose from 'mongoose';

// connect to DB
const url = 'mongodb://localhost/kicktipp2016';
const connection = mongoose.connect(url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'socket connection error:'));
db.once('open', function() {
    console.log("connected to mongodb");
});

const app = express();
app.use('/api/*', bodyParser.urlencoded({extended: true}));
app.use('/api/*', bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(compression());

const webServer = http.Server(app);

const config = {
	port: 30001,
	host: 'localhost'
};

app.get('/', function(req, res){
  res.send('<h1>Socket io server here</h1>');
});

webServer.listen(config.port, config.host, err => {
    if (err) throw err;
    console.log('Web server listening at http://%s:%d', config.host, config.port);
});

const io = new SocketIo(webServer)
const socketEvents = require('./socketio/socketEvents')(io);