export default function callAPIMiddleware({ dispatch, getState }) {
    return next => (action) => {
        const {
            types,
            callAPI,
            shouldCallAPI = () => true,
            payload = {}
        } = action;

        if (!types) {
            return next(action);
        }

        if (
            !Array.isArray(types) ||
            types.length !== 3 ||
            !types.every(type => typeof type === 'string')
        ) {
            throw new Error('Expected an array of three string types.');
        }

        if (typeof callAPI !== 'function') {
            throw new Error('Expected fetch to be a function.');
        }

        if (!shouldCallAPI(getState())) {
            return '';
        }

        const [requestType, successType, failureType] = types;

        dispatch(Object.assign({}, payload, {
            type: requestType
        }));

        return callAPI()
            .done((json) => {
                dispatch(Object.assign({}, payload, {
                    type: successType,
                    json
                }));
                if (json) {
                    dispatch(Object.assign({}, payload, {
                        type: 'SET_MESSAGE',
                        error: json.error || '',
                        msg: json.message || '',
                        timestamp: new Date().getTime()
                    }));
                }
            })
            .fail((json) => {
                dispatch(Object.assign({}, payload, {
                    type: failureType,
                    json
                }));
                if (json && json.responseJSON) {
                    dispatch(Object.assign({}, payload, {
                        type: 'SET_MESSAGE',
                        error: json.responseJSON.error || '',
                        msg: json.responseJSON.message || '',
                        timestamp: new Date().getTime()
                    }));
                }
            });
    };
}
