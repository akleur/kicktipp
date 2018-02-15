import ChatMessage from './models/ChatMessage';

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('action', (action) => {
            if (action.type === 'SOCKET_LOAD_CHATMESSAGES_REQUEST') {
                ChatMessage.paginate({}, { limit: 500, sort: { timestamp: 'desc' } }, (err, data) => {
                    if (err) {
                        console.log(err);
                        socket.emit('action', { type: 'SOCKET_LOAD_CHATMESSAGES_FAILURE', err });
                    } else {
                        socket.emit('action', { type: 'SOCKET_LOAD_CHATMESSAGES_SUCCESS', data });
                    }
                });
            }

            if (action.type === 'SOCKET_POST_CHATMESSAGE_REQUEST') {
                const message = action.data;
                message.date = new Date();
                message.timestamp = Date.now();
                const msg = new ChatMessage(message);

                msg.save((err, retmsg) => {
                    if (err) {
                        socket.emit('action', { type: 'SOCKET_POST_CHATMESSAGE_FAILURE', err });
                    } else {
                        io.emit('action', { type: 'SOCKET_POST_CHATMESSAGE_SUCCESS', message: retmsg });
                    }
                });
            }
        });
    });
};
