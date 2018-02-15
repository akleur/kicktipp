import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import * as ActionTypes from '../actions/actionCreators.jsx';

/* AppVersion */
function appVersion(state = {
    isFetching: false,
    data: '',
    version: '',
}, action) {
    switch (action.type) {
    case ActionTypes.LOAD_APPVERSION_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.LOAD_APPVERSION_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            version: action.json.data.version
        });
    case ActionTypes.LOAD_APPVERSION_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.json.responseJSON.data
        });
    default:
        return state;
    }
}

/* Loading */
function loading(state = {
    isLoading: false
}, action) {
    switch (action.type) {
    case ActionTypes.SET_LOADING:
        return Object.assign({}, state, {
            isLoading: action.value
        });
    default:
        return state;
    }
}

/* Message */
function message(state = {}, action) {
    switch (action.type) {
    case ActionTypes.SET_MESSAGE:
        return Object.assign({}, state, {
            error: action.error,
            msg: action.msg,
            timestamp: action.timestamp
        });
    default:
        return state;
    }
}

/* Auth */
function auth(state = {
    isFetching: false,
    isAuthenticated: false,
    token: '',
    currentUser: {}
}, action) {
    switch (action.type) {
    case ActionTypes.LOGIN_INITIAL:
        if (action.json.data.token && action.json.data.user) {
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                token: action.json.data.token,
                currentUser: action.json.data.user
            });
        }
        localStorage.removeItem('token');
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: false
        });
    case ActionTypes.LOGIN_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
            isAuthenticated: false
        });
    case ActionTypes.LOGIN_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: true,
            token: action.json.data.token,
            currentUser: action.json.data.user
        });
    case ActionTypes.LOGIN_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: false
        });
    case ActionTypes.LOGIN_SET_TOKEN:
        return Object.assign({}, state, {});
    case ActionTypes.LOGOUT:
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: false,
            token: '',
            currentUser: {}
        });
    case ActionTypes.CHANGE_PASSWORD_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.CHANGE_PASSWORD_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false
        });
    case ActionTypes.CHANGE_PASSWORD_FAILURE:
        return Object.assign({}, state, {
            isFetching: false
        });
    default:
        return state;
    }
}

/* Users */
function user(state, action) {
    switch (action.type) {
    case 'CHANGE_USER_SUCCESS': {
        const userChangeObj = action.user;
        if (state.id !== userChangeObj.id) {
            return state;
        }
        const changedUser = {};
        // @todo: refactor this to Object.keys
        for (let key in userChangeObj) {
            if (userChangeObj.hasOwnProperty(key)) {
                changedUser[key] = userChangeObj[key];
            }
        }
        return Object.assign({}, state, changedUser);
    }
    default:
        return state;
    }
}


function users(state = {
    isFetching: false,
    items: [],
    data: '',
    count: 0
}, action) {
    switch (action.type) {
    case ActionTypes.LOAD_USERS_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.LOAD_USERS_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            items: action.json.data.items,
            count: action.json.data.count
        });
    case ActionTypes.LOAD_USERS_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            message: action.json.responseJSON.message
        });

    case ActionTypes.LOAD_USERS_ADMIN_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.LOAD_USERS_ADMIN_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            items: action.json.data.items,
            count: action.json.data.count
        });
    case ActionTypes.LOAD_USERS_ADMIN_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            error: action.json.responseJSON.error
        });

    case ActionTypes.ADD_USER_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.ADD_USER_SUCCESS: {
        const UserListNewUser = state.items.concat(action.json.data);
        return Object.assign({}, state, {
            isFetching: false,
            items: UserListNewUser,
            data: action.json.data,
            count: state.count + 1
        });
    }
    case ActionTypes.ADD_USER_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.json.responseJSON.data
        });

    case ActionTypes.VALIDATE_USERNAME_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.VALIDATE_USERNAME_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.json.data
        });
    case ActionTypes.VALIDATE_USERNAME_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.json.responseJSON.data
        });

    case ActionTypes.CHANGE_USER_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.CHANGE_USER_SUCCESS: {
        const userList = state.items.map(t =>
            user(t, action)
        );
        return Object.assign({}, state, {
            items: userList,
            isFetching: false,
            data: action.json.data
        });
    }
    case ActionTypes.CHANGE_USER_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.json.responseJSON.data
        });

    case ActionTypes.DELETE_USER_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.DELETE_USER_SUCCESS: {
        const indexToDelete = state.items.map(el => el.id).indexOf(action.id);
        return Object.assign({}, state, {
            items: [...state.items.slice(0, indexToDelete), ...state.items.slice(indexToDelete + 1)],
            isFetching: false,
            count: state.count - 1
        });
    }
    case ActionTypes.DELETE_USER_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.json.responseJSON.data
        });
    default:
        return state;
    }
}

/* Teams */
function teams(state = {
    isFetching: false,
    data: '',
    items: [],
    count: 0
}, action) {
    switch (action.type) {
    case ActionTypes.LOAD_TEAMS_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.LOAD_TEAMS_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            items: action.json.data.items,
            count: action.json.data.count
        });
    case ActionTypes.LOAD_TEAMS_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.json.responseJSON.data
        });
    default:
        return state;
    }
}

/* Matches */
function matches(state = {
    isFetching: false,
    data: '',
    items: [],
    count: 0,
    isFetchingMatchTips: false,
    selectedMatchTips: []
}, action) {
    switch (action.type) {
    case ActionTypes.LOAD_MATCHES_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.LOAD_MATCHES_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            items: action.json.data.items,
            count: action.json.data.count
        });
    case ActionTypes.LOAD_MATCHES_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.json.responseJSON.data
        });
    case ActionTypes.LOAD_MATCHTIPS_REQUEST:
        return Object.assign({}, state, {
            isFetchingMatchTips: true
        });
    case ActionTypes.LOAD_MATCHTIPS_SUCCESS:
        return Object.assign({}, state, {
            isFetchingMatchTips: false,
            selectedMatchTips: action.json.data.items
        });
    case ActionTypes.LOAD_MATCHTIPS_FAILURE:
        return Object.assign({}, state, {
            isFetchingMatchTips: false,
            data: action.json.responseJSON.data
        });
    default:
        return state;
    }
}

/* Scores */
function scores(state = {
    isFetching: false,
    data: ''
}, action) {
    switch (action.type) {
    case ActionTypes.POST_SCORES_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.POST_SCORES_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false
        });
    case ActionTypes.POST_SCORES_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.json.responseJSON.data
        });
    default:
        return state;
    }
}

/* UserHistory */
function userhistory(state = {
    isFetching: false,
    data: ''
}, action) {
    switch (action.type) {
    case ActionTypes.UPDATE_USERHISTORY_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.UPDATE_USERHISTORY_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false
        });
    case ActionTypes.UPDATE_USERHISTORY_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.json.responseJSON.data
        });
    default:
        return state;
    }
}

/* Groups */
function groups(state = {
    isFetching: false,
    data: '',
    items: [],
    count: 0
}, action) {
    switch (action.type) {
    case ActionTypes.LOAD_GROUPS_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.LOAD_GROUPS_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            items: action.json.data.items,
            count: action.json.data.count
        });
    case ActionTypes.LOAD_GROUPS_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.json.responseJSON.data
        });
    default:
        return state;
    }
}

/* EM Tips grouped */
function emTipTeams(state = {
    isFetching: false,
    data: '',
    items: [],
    count: 0
}, action) {
    switch (action.type) {
    case ActionTypes.LOAD_EMTIPTEAMS_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.LOAD_EMTIPTEAMS_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            items: action.json.data.items,
            count: action.json.data.count
        });
    case ActionTypes.LOAD_EMTIPTEAMS_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.json.responseJSON.data
        });
    default:
        return state;
    }
}

/* Own Tips */
function ownTips(state = {
    isFetching: false,
    isPosting: false,
    data: '',
    items: [],
    count: 0
}, action) {
    switch (action.type) {
    case ActionTypes.LOAD_OWNTIPS_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.LOAD_OWNTIPS_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            items: action.json.data.items,
            count: action.json.data.count
        });
    case ActionTypes.LOAD_OWNTIPS_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.json.responseJSON.data
        });
    case ActionTypes.POST_OWNTIPS_REQUEST:
        return Object.assign({}, state, {
            isPosting: true
        });
    case ActionTypes.POST_OWNTIPS_SUCCESS:
        return Object.assign({}, state, {
            isPosting: false
        });
    case ActionTypes.POST_OWNTIPS_FAILURE:
        return Object.assign({}, state, {
            isPosting: false
        });
    default:
        return state;
    }
}

/* User Tips */

function userTips(state = {
    isFetching: false,
    data: '',
    tipListUser: {}
}, action) {
    switch (action.type) {
    case ActionTypes.LOAD_USERTIPS_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.LOAD_USERTIPS_SUCCESS: {
        const userId = parseInt(action.json.data.userId, 10);
        const tipListUserCopy = Object.assign({}, state.tipListUser);
        tipListUserCopy[userId] = action.json.data.items;
        return Object.assign({}, state, {
            isFetching: false,
            tipListUser: tipListUserCopy,
        });
    }
    case ActionTypes.LOAD_USERTIPS_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.json.responseJSON.data
        });
    default:
        return state;
    }
}

/* Own Joker */
function ownJoker(state = {
    isFetching: false,
    isPosting: false,
    resource: {}
}, action) {
    switch (action.type) {
    case ActionTypes.LOAD_OWNJOKER_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.LOAD_OWNJOKER_SUCCESS: {
        const loadOwnJokerObj = {
            isFetching: false
        };
        if (action.json.data.resource) {
            loadOwnJokerObj.resource = action.json.data.resource;
        }
        return Object.assign({}, state, loadOwnJokerObj);
    }
    case ActionTypes.LOAD_OWNJOKER_FAILURE:
        return Object.assign({}, state, {
            isFetching: false
        });
    case ActionTypes.POST_OWNJOKER_REQUEST:
        return Object.assign({}, state, {
            isPosting: true
        });
    case ActionTypes.POST_OWNJOKER_SUCCESS:
        return Object.assign({}, state, {
            isPosting: false
        });
    case ActionTypes.POST_OWNJOKER_FAILURE:
        return Object.assign({}, state, {
            isPosting: false
        });
    case ActionTypes.UPDATE_OWNJOKER_REQUEST:
        return Object.assign({}, state, {
            isPosting: true
        });
    case ActionTypes.UPDATE_OWNJOKER_SUCCESS:
        return Object.assign({}, state, {
            isPosting: false
        });
    case ActionTypes.UPDATE_OWNJOKER_FAILURE:
        return Object.assign({}, state, {
            isPosting: false
        });
    default:
        return state;
    }
}

/* Jokers */
function jokers(state = {
    isFetching: false,
    data: '',
    items: [],
    count: 0
}, action) {
    switch (action.type) {
    case ActionTypes.LOAD_JOKERS_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.LOAD_JOKERS_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            items: action.json.data.items,
            count: action.json.data.count
        });
    case ActionTypes.LOAD_JOKERS_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.json.responseJSON.data
        });
    default:
        return state;
    }
}

/* Own EM Tip */
function ownEMTip(state = {
    isFetching: false,
    isPosting: false,
    resource: {}
}, action) {
    switch (action.type) {
    case ActionTypes.LOAD_OWNEMTIP_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.LOAD_OWNEMTIP_SUCCESS: {
        const loadOwnEmTipObj = {
            isFetching: false
        };
        if (action.json.data.resource) {
            loadOwnEmTipObj.resource = action.json.data.resource;
        }
        return Object.assign({}, state, loadOwnEmTipObj);
    }
    case ActionTypes.LOAD_OWNEMTIP_FAILURE:
        return Object.assign({}, state, {
            isFetching: false
        });
    case ActionTypes.POST_OWNEMTIP_REQUEST:
        return Object.assign({}, state, {
            isPosting: true
        });
    case ActionTypes.POST_OWNEMTIP_SUCCESS:
        return Object.assign({}, state, {
            isPosting: false
        });
    case ActionTypes.POST_OWNEMTIP_FAILURE:
        return Object.assign({}, state, {
            isPosting: false
        });
    case ActionTypes.UPDATE_OWNEMTIP_REQUEST:
        return Object.assign({}, state, {
            isPosting: true
        });
    case ActionTypes.UPDATE_OWNEMTIP_SUCCESS:
        return Object.assign({}, state, {
            isPosting: false
        });
    case ActionTypes.UPDATE_OWNEMTIP_FAILURE:
        return Object.assign({}, state, {
            isPosting: false
        });
    default:
        return state;
    }
}

/* Rounds */
function rounds(state = {
    isFetching: false,
    isFetchingCurrentRound: false,
    data: '',
    items: [],
    count: 0,
    current: {
        id: 0
    }
}, action) {
    switch (action.type) {
    case ActionTypes.LOAD_CURRENTROUND_REQUEST:
        return Object.assign({}, state, {
            isFetchingCurrentRound: true
        });
    case ActionTypes.LOAD_CURRENTROUND_SUCCESS:
        return Object.assign({}, state, {
            isFetchingCurrentRound: false,
            current: action.json.data
        });
    case ActionTypes.LOAD_CURRENTROUND_FAILURE:
        return Object.assign({}, state, {
            isFetchingCurrentRound: false,
            data: action.json.data
        });
    case ActionTypes.LOAD_ROUNDS_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.LOAD_ROUNDS_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            items: action.json.data.items,
            count: action.json.data.count
        });
    case ActionTypes.LOAD_ROUNDS_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.json.data
        });
    default:
        return state;
    }
}

/* Penalty Survey */
function penaltySurvey(state = {
    isFetching: false,
    data: '',
    items: [],
    count: 0
}, action) {
    switch (action.type) {
    case ActionTypes.LOAD_PENALTYSURVEYRESULTS_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.LOAD_PENALTYSURVEYRESULTS_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            items: action.json.data.items,
            count: action.json.data.count
        });
    case ActionTypes.LOAD_PENALTYSURVEYRESULTS_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.json.data
        });
    case ActionTypes.POST_PENALTYSURVEYRESULT_REQUEST:
        return Object.assign({}, state, {
            isPosting: true
        });
    case ActionTypes.POST_PENALTYSURVEYRESULT_SUCCESS: {
        const resultListNewResult = state.items.map((i) => {
            const item = i;
            if (item.choice === action.json.data.choice) {
                item.count++;
            }
        });
        return Object.assign({}, state, {
            isFetching: false,
            items: resultListNewResult,
            data: action.json.data,
            count: state.count + 1
        });
    }
    case ActionTypes.POST_PENALTYSURVEYRESULT_FAILURE:
        return Object.assign({}, state, {
            isPosting: false
        });
    default:
        return state;
    }
}

/* Chat */
function chat(state = {
    isFetching: false,
    isPosting: false,
    messages: [],
    limit: 0,
    offset: 0,
    page: 0,
    pages: 0,
    total: 0
}, action) {
    switch (action.type) {
    case ActionTypes.SOCKET_LOAD_CHATMESSAGES_REQUEST:
        return Object.assign({}, state, {
            isFetching: true
        });
    case ActionTypes.SOCKET_LOAD_CHATMESSAGES_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            messages: action.data.docs
        });
    case ActionTypes.SOCKET_LOAD_CHATMESSAGES_FAILURE:
        return Object.assign({}, state, {
            isFetching: false
        });
    case ActionTypes.SOCKET_POST_CHATMESSAGE_REQUEST:
        return Object.assign({}, state, {
            isPosting: true
        });
    case ActionTypes.SOCKET_POST_CHATMESSAGE_SUCCESS: {
        const MessageListNewMsg = [].concat(action.message, state.messages);
        return Object.assign({}, state, {
            isPosting: false,
            messages: MessageListNewMsg
        });
    }
    case ActionTypes.SOCKET_POST_CHATMESSAGE_FAILURE:
        return Object.assign({}, state, {
            isPosting: false
        });
    default:
        return state;
    }
}

const rootReducer = combineReducers({
    appVersion,
    loading,
    message,
    auth,
    users,
    teams,
    matches,
    scores,
    userhistory,
    groups,
    emTipTeams,
    ownTips,
    ownEMTip,
    ownJoker,
    userTips,
    jokers,
    rounds,
    penaltySurvey,
    chat,
    form: formReducer,
    toastr: toastrReducer
});

export default rootReducer;
