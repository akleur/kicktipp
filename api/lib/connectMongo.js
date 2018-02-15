import mongoose from 'mongoose';

function ConnectMongo() {
    this.init = () => {
        const url = 'mongodb://localhost/kicktipp';
        mongoose.connect(url);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            console.log('connected to mongodb');
        });
    };
    this.disconnect = () => {
        mongoose.disconnect();
    };
}

module.exports = new ConnectMongo();
