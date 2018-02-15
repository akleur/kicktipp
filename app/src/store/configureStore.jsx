import { createStore, applyMiddleware } from 'redux';
import io from 'socket.io-client';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import callAPIMiddleware from './api.jsx';
import createSocketIoMiddleware from './socketio.jsx';
import rootReducer from '../reducers/index.jsx';

/*let socketServerUrl = 'http://kicktipp.schwuppdiwupp.net';
if (window.location.hostname === 'localhost') {
    socketServerUrl = 'http://localhost:3001';
}
const socket = io.connect(socketServerUrl, { path: '/socket.io' });
const socketIoMiddleware = createSocketIoMiddleware(socket, 'SOCKET_');

const middlewares = [thunk, callAPIMiddleware, socketIoMiddleware];*/

const middlewares = [thunk, callAPIMiddleware];

if (process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    middlewares.push(logger);
}

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middlewares)
    );
}
