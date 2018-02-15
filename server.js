import express from 'express';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import connection from './api/lib/connection';

const app = express();

console.log('Current environment: ', app.get('env'));
connection.init(app.get('env'));

/* Serve API routes first */
app.use('/api/*', bodyParser.urlencoded({ extended: true }));
app.use('/api/*', bodyParser.json());

app.use('/api/*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const routes = require('./api/routes');

routes.configure(app);

/* Serve frontend app */
app.use(compression());

app.use(express.static(path.resolve(__dirname, 'app', 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'app', 'dist', 'index.html'));
});


/* Start server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Production Express server running at localhost: ${PORT}`);
});
