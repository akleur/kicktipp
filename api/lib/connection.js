import mysql from 'mysql';

function Connection() {
    this.pool = null;

    this.init = (env) => {
        // Enter hosts here
        let host = 'xx.xxx.xxx.xx';
        if (env === 'development') {
            host = 'xx.xxx.xxx.xx';
        }
        // Enter mysql credentials here
        this.pool = mysql.createPool({
            acquireTimeout: 20000,
            connectionLimit: 1000,
            host,
            user: 'kicktipp',
            password: 'yourpass',
            database: 'kicktipp',
            debug: false
        });
    };

    this.acquire = (callback) => {
        this.pool.getConnection((err, connection) => {
            console.log('error', err);
            callback(err, connection);
        });
    };
}

module.exports = new Connection();
