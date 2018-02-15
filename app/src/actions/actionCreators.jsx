const baseUrl = `${location.protocol}//${location.host}`;
const API_BASE = `${baseUrl}/api/`;

const getInitialConfig = () => {
    return { headers: { 'x-access-token': localStorage.getItem('token') || '' } };
};

/* AppVersion */
export const LOAD_APPVERSION_REQUEST = 'LOAD_APPVERSION_REQUEST';
export const LOAD_APPVERSION_SUCCESS = 'LOAD_APPVERSION_SUCCESS';
export const LOAD_APPVERSION_FAILURE = 'LOAD_APPVERSION_FAILURE';

export function getAppVersion() {
    const config = getInitialConfig();
    config.method = 'GET';

    return {
        types: ['LOAD_APPVERSION_REQUEST', 'LOAD_APPVERSION_SUCCESS', 'LOAD_APPVERSION_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}version`, config),
        payload: {}
    };
}

/* Loading */
export const SET_LOADING = 'SET_LOADING';

export function setLoading(value) {
    return (dispatch) => {
        dispatch({
            type: SET_LOADING,
            value
        });
    };
}

/* Message */
export const SET_MESSAGE = 'SET_MESSAGE';

export function setMessage(error, msg) {
    return (dispatch) => {
        dispatch({
            type: SET_MESSAGE,
            error,
            msg,
            timestamp: new Date().getTime()
        });
    };
}

/* Login process */
export const LOGIN_INITIAL = 'LOGIN_INITIAL';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function loginUserInitial(token) {
    const config = getInitialConfig();
    config.method = 'POST';
    config.data = { token };

    return {
        types: ['LOGIN_REQUEST', 'LOGIN_INITIAL', 'LOGIN_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}authenticatetoken`, config),
        payload: {}
    };
}

export function loginUser(creds) {
    const config = getInitialConfig();
    config.method = 'POST';
    config.data = creds;

    return {
        types: ['LOGIN_REQUEST', 'LOGIN_SUCCESS', 'LOGIN_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}authenticate`, config),
        payload: {}
    };
}

export const LOGIN_SET_TOKEN = 'LOGIN_SET_TOKEN';

export function setToken(token) {
    localStorage.setItem('token', token);
    return (dispatch) => {
        dispatch({
            type: LOGIN_SET_TOKEN,
            token
        });
    };
}

export const LOGOUT = 'LOGOUT';

export function logoutUser() {
    localStorage.removeItem('token');
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        });
    };
}

/* Users */
export const LOAD_USERS_REQUEST = 'LOAD_USERS_REQUEST';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_FAILURE = 'LOAD_USERS_FAILURE';

export function loadUsers() {
    const config = getInitialConfig();
    config.method = 'GET';

    return {
        types: ['LOAD_USERS_REQUEST', 'LOAD_USERS_SUCCESS', 'LOAD_USERS_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}users`, config),
        payload: {}
    };
}

export const LOAD_USERS_ADMIN_REQUEST = 'LOAD_USERS_ADMIN_REQUEST';
export const LOAD_USERS_ADMIN_SUCCESS = 'LOAD_USERS_ADMIN_SUCCESS';
export const LOAD_USERS_ADMIN_FAILURE = 'LOAD_USERS_ADMIN_FAILURE';

export function loadUsersAdmin() {
    const config = getInitialConfig();
    config.method = 'GET';

    return {
        types: ['LOAD_USERS_ADMIN_REQUEST', 'LOAD_USERS_ADMIN_SUCCESS', 'LOAD_USERS_ADMIN_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}users/admin`, config),
        payload: {}
    };
}

export const VALIDATE_USERNAME_REQUEST = 'VALIDATE_USERNAME_REQUEST';
export const VALIDATE_USERNAME_SUCCESS = 'VALIDATE_USERNAME_SUCCESS';
export const VALIDATE_USERNAME_FAILURE = 'VALIDATE_USERNAMEFAILURE';

export function validateUsername(username) {
    const config = getInitialConfig();
    config.method = 'POST';
    config.data = username;

    return {
        types: ['VALIDATE_USERNAME_REQUEST', 'VALIDATE_USERNAME_SUCCESS', 'VALIDATE_USERNAME_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}validatename`, config),
        payload: {}
    };
}

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

export function addUser(user) {
    const config = getInitialConfig();
    config.method = 'POST';
    config.data = user;

    return {
        types: ['ADD_USER_REQUEST', 'ADD_USER_SUCCESS', 'ADD_USER_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}users`, config),
        payload: {}
    };
}

export const CHANGE_USER_REQUEST = 'CHANGE_USER_REQUEST';
export const CHANGE_USER_SUCCESS = 'CHANGE_USER_SUCCESS';
export const CHANGE_USER_FAILURE = 'CHANGE_USER_FAILURE';

export function changeUser(user) {
    const config = getInitialConfig();
    config.method = 'PUT';
    config.data = user;

    return {
        types: ['CHANGE_USER_REQUEST', 'CHANGE_USER_SUCCESS', 'CHANGE_USER_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}users/admin`, config),
        payload: {
            user
        }
    };
}

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

export function changePassword(userdata) {
    const config = getInitialConfig();
    config.method = 'PUT';
    config.data = userdata;

    return {
        types: ['CHANGE_PASSWORD_REQUEST', 'CHANGE_PASSWORD_SUCCESS', 'CHANGE_PASSWORD_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}users/me`, config),
        payload: {}
    };
}

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export function deleteUser(id) {
    const config = getInitialConfig();
    config.method = 'DELETE';

    return {
        types: ['DELETE_USER_REQUEST', 'DELETE_USER_SUCCESS', 'DELETE_USER_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}users/admin/${id}`, config),
        payload: {
            id
        }
    };
}

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export function loadUser(userId) {
    const config = getInitialConfig();
    config.method = 'GET';

    return {
        types: ['LOAD_USER_REQUEST', 'LOAD_USER_SUCCESS', 'LOAD_USER_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}user/${userId}`, config),
        payload: {}
    };
}

/* Teams */
export const LOAD_TEAMS_REQUEST = 'LOAD_TEAMS_REQUEST';
export const LOAD_TEAMS_SUCCESS = 'LOAD_TEAMS_SUCCESS';
export const LOAD_TEAMS_FAILURE = 'LOAD_TEAMS_FAILURE';

export function loadTeams() {
    const config = getInitialConfig();
    config.method = 'GET';

    return {
        types: ['LOAD_TEAMS_REQUEST', 'LOAD_TEAMS_SUCCESS', 'LOAD_TEAMS_FAILURE'],
        shouldCallAPI: state => !state.teams.length,
        callAPI: () => $.ajax(`${API_BASE}teams`, config),
        payload: {}
    };
}

/* Matches */
export const LOAD_MATCHES_REQUEST = 'LOAD_MATCHES_REQUEST';
export const LOAD_MATCHES_SUCCESS = 'LOAD_MATCHES_SUCCESS';
export const LOAD_MATCHES_FAILURE = 'LOAD_MATCHES_FAILURE';

export function loadMatches() {
    const config = getInitialConfig();
    config.method = 'GET';

    return {
        types: ['LOAD_MATCHES_REQUEST', 'LOAD_MATCHES_SUCCESS', 'LOAD_MATCHES_FAILURE'],
        shouldCallAPI: state => !state.matches.length,
        callAPI: () => $.ajax(`${API_BASE}matches`, config),
        payload: {}
    };
}

export const LOAD_MATCHTIPS_REQUEST = 'LOAD_MATCHTIPS_REQUEST';
export const LOAD_MATCHTIPS_SUCCESS = 'LOAD_MATCHTIPS_SUCCESS';
export const LOAD_MATCHTIPS_FAILURE = 'LOAD_MATCHTIPS_FAILURE';

export function loadMatchTips(id) {
    const config = getInitialConfig();
    config.method = 'GET';

    return {
        types: ['LOAD_MATCHTIPS_REQUEST', 'LOAD_MATCHTIPS_SUCCESS', 'LOAD_MATCHTIPS_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}tips/match/${id}`, config),
        payload: {}
    };
}

/* Scores */
export const POST_SCORES_REQUEST = 'POST_SCORES_REQUEST';
export const POST_SCORES_SUCCESS = 'POST_SCORES_SUCCESS';
export const POST_SCORES_FAILURE = 'POST_SCORES_FAILURE';

export function postScores(scores) {
    const config = getInitialConfig();
    config.method = 'POST';
    config.data = { scores };

    return {
        types: ['POST_SCORES_REQUEST', 'POST_SCORES_SUCCESS', 'POST_SCORES_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}matches`, config),
        payload: {}
    };
}

/* User History */
export const UPDATE_USERHISTORY_REQUEST = 'UPDATE_USERHISTORY_REQUEST';
export const UPDATE_USERHISTORY_SUCCESS = 'UPDATE_USERHISTORY_SUCCESS';
export const UPDATE_USERHISTORY_FAILURE = 'UPDATE_USERHISTORY_FAILURE';

export function updateUserHistory() {
    const config = getInitialConfig();
    config.method = 'GET';

    return {
        types: ['UPDATE_USERHISTORY_REQUEST', 'UPDATE_USERHISTORY_SUCCESS', 'UPDATE_USERHISTORY_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}userhistory`, config),
        payload: {}
    };
}

/* Groups */
export const LOAD_GROUPS_REQUEST = 'LOAD_GROUPS_REQUEST';
export const LOAD_GROUPS_SUCCESS = 'LOAD_GROUPS_SUCCESS';
export const LOAD_GROUPS_FAILURE = 'LOAD_GROUPS_FAILURE';

export function loadGroups() {
    const config = getInitialConfig();
    config.method = 'GET';

    return {
        types: ['LOAD_GROUPS_REQUEST', 'LOAD_GROUPS_SUCCESS', 'LOAD_GROUPS_FAILURE'],
        shouldCallAPI: state => !state.groups.length,
        callAPI: () => $.ajax(`${API_BASE}groups`, config),
        payload: {}
    };
}

/* EM Tips grouped */
export const LOAD_EMTIPTEAMS_REQUEST = 'LOAD_EMTIPTEAMS_REQUEST';
export const LOAD_EMTIPTEAMS_SUCCESS = 'LOAD_EMTIPTEAMS_SUCCESS';
export const LOAD_EMTIPTEAMS_FAILURE = 'LOAD_EMTIPTEAMS_FAILURE';

export function loadEMTipTeams() {
    const config = getInitialConfig();
    config.method = 'GET';

    return {
        types: ['LOAD_EMTIPTEAMS_REQUEST', 'LOAD_EMTIPTEAMS_SUCCESS', 'LOAD_EMTIPTEAMS_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}championtips/grouped`, config),
        payload: {}
    };
}

/* Own Tips */
export const LOAD_OWNTIPS_REQUEST = 'LOAD_OWNTIPS_REQUEST';
export const LOAD_OWNTIPS_SUCCESS = 'LOAD_OWNTIPS_SUCCESS';
export const LOAD_OWNTIPS_FAILURE = 'LOAD_OWNTIPS_FAILURE';

export function loadOwnTips() {
    const config = getInitialConfig();
    config.method = 'GET';

    return {
        types: ['LOAD_OWNTIPS_REQUEST', 'LOAD_OWNTIPS_SUCCESS', 'LOAD_OWNTIPS_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}tips/me`, config),
        payload: {}
    };
}

export const POST_OWNTIPS_REQUEST = 'POST_OWNTIPS_REQUEST';
export const POST_OWNTIPS_SUCCESS = 'POST_OWNTIPS_SUCCESS';
export const POST_OWNTIPS_FAILURE = 'POST_OWNTIPS_FAILURE';

export function postOwnTips(tips) {
    const config = getInitialConfig();
    config.method = 'POST';
    config.data = { tips };

    return {
        types: ['POST_OWNTIPS_REQUEST', 'POST_OWNTIPS_SUCCESS', 'POST_OWNTIPS_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}tips/me`, config),
        payload: {}
    };
}

export const LOAD_OWNEMTIP_REQUEST = 'LOAD_OWNEMTIP_REQUEST';
export const LOAD_OWNEMTIP_SUCCESS = 'LOAD_OWNEMTIP_SUCCESS';
export const LOAD_OWNEMTIP_FAILURE = 'LOAD_OWNEMTIP_FAILURE';

export function loadOwnEmTip() {
    const config = getInitialConfig();
    config.method = 'GET';

    return {
        types: ['LOAD_OWNEMTIP_REQUEST', 'LOAD_OWNEMTIP_SUCCESS', 'LOAD_OWNEMTIP_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}championtips/me`, config),
        payload: {}
    };
}

export const POST_OWNEMTIP_REQUEST = 'POST_OWNEMTIP_REQUEST';
export const POST_OWNEMTIP_SUCCESS = 'POST_OWNEMTIP_SUCCESS';
export const POST_OWNEMTIP_FAILURE = 'POST_OWNEMTIP_FAILURE';

export function postOwnEmTip(tip) {
    const config = getInitialConfig();
    config.method = 'POST';
    config.data = tip;

    return {
        types: ['POST_OWNEMTIP_REQUEST', 'POST_OWNEMTIP_SUCCESS', 'POST_OWNEMTIP_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}championtips/me`, config),
        payload: {}
    };
}

export const UPDATE_OWNEMTIP_REQUEST = 'UPDATE_OWNEMTIP_REQUEST';
export const UPDATE_OWNEMTIP_SUCCESS = 'UPDATE_OWNEMTIP_SUCCESS';
export const UPDATE_OWNEMTIP_FAILURE = 'UPDATE_OWNEMTIP_FAILURE';

export function updateOwnEmTip(tip) {
    const config = getInitialConfig();
    config.method = 'PUT';
    config.data = tip;

    return {
        types: ['UPDATE_OWNEMTIP_REQUEST', 'UPDATE_OWNEMTIP_SUCCESS', 'UPDATE_OWNEMTIP_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}championtips/me`, config),
        payload: {}
    };
}

/* Tips for user */
export const LOAD_USERTIPS_REQUEST = 'LOAD_USERTIPS_REQUEST';
export const LOAD_USERTIPS_SUCCESS = 'LOAD_USERTIPS_SUCCESS';
export const LOAD_USERTIPS_FAILURE = 'LOAD_USERTIPS_FAILURE';

export function loadUserTips(userId) {
    const config = getInitialConfig();
    config.method = 'GET';

    return {
        types: ['LOAD_USERTIPS_REQUEST', 'LOAD_USERTIPS_SUCCESS', 'LOAD_USERTIPS_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}tips/user/${userId}`, config),
        payload: {}
    };
}

/* Joker */
export const LOAD_OWNJOKER_REQUEST = 'LOAD_OWNJOKER_REQUEST';
export const LOAD_OWNJOKER_SUCCESS = 'LOAD_OWNJOKER_SUCCESS';
export const LOAD_OWNJOKER_FAILURE = 'LOAD_OWNJOKER_FAILURE';

export function loadOwnJoker() {
    const config = getInitialConfig();
    config.method = 'GET';

    return {
        types: ['LOAD_OWNJOKER_REQUEST', 'LOAD_OWNJOKER_SUCCESS', 'LOAD_OWNJOKER_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}jokers/me`, config),
        payload: {}
    };
}

export const POST_OWNJOKER_REQUEST = 'POST_OWNJOKER_REQUEST';
export const POST_OWNJOKER_SUCCESS = 'POST_OWNJOKER_SUCCESS';
export const POST_OWNJOKER_FAILURE = 'POST_OWNJOKER_FAILURE';

export function postOwnJoker(joker) {
    const config = getInitialConfig();
    config.method = 'POST';
    config.data = joker;

    return {
        types: ['POST_OWNJOKER_REQUEST', 'POST_OWNJOKER_SUCCESS', 'POST_OWNJOKER_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}jokers/me`, config),
        payload: {}
    };
}

export const UPDATE_OWNJOKER_REQUEST = 'UPDATE_OWNJOKER_REQUEST';
export const UPDATE_OWNJOKER_SUCCESS = 'UPDATE_OWNJOKER_SUCCESS';
export const UPDATE_OWNJOKER_FAILURE = 'UPDATE_OWNJOKER_FAILURE';

export function updateOwnJoker(joker) {
    const config = getInitialConfig();
    config.method = 'PUT';
    config.data = joker;

    return {
        types: ['UPDATE_OWNJOKER_REQUEST', 'UPDATE_OWNJOKER_SUCCESS', 'UPDATE_OWNJOKER_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}jokers/me`, config),
        payload: {}
    };
}

export const LOAD_JOKERS_REQUEST = 'LOAD_JOKERS_REQUEST';
export const LOAD_JOKERS_SUCCESS = 'LOAD_JOKERS_SUCCESS';
export const LOAD_JOKERS_FAILURE = 'LOAD_JOKERS_FAILURE';

export function loadJokers() {
    const config = getInitialConfig();
    config.method = 'GET';

    return {
        types: ['LOAD_JOKERS_REQUEST', 'LOAD_JOKERS_SUCCESS', 'LOAD_JOKERS_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}jokers`, config),
        payload: {}
    };
}

/* Rounds */
export const LOAD_CURRENTROUND_REQUEST = 'LOAD_CURRENTROUND_REQUEST';
export const LOAD_CURRENTROUND_SUCCESS = 'LOAD_CURRENTROUND_SUCCESS';
export const LOAD_CURRENTROUND_FAILURE = 'LOAD_CURRENTROUND_FAILURE';

export function loadCurrentRound() {
    const config = getInitialConfig();
    config.method = 'GET';

    return {
        types: ['LOAD_CURRENTROUND_REQUEST', 'LOAD_CURRENTROUND_SUCCESS', 'LOAD_CURRENTROUND_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}rounds/current`, config),
        payload: {}
    };
}

export const LOAD_ROUNDS_REQUEST = 'LOAD_ROUNDS_REQUEST';
export const LOAD_ROUNDS_SUCCESS = 'LOAD_ROUNDS_SUCCESS';
export const LOAD_ROUNDS_FAILURE = 'LOAD_ROUNDS_FAILURE';

export function loadRounds() {
    const config = getInitialConfig();
    config.method = 'GET';

    return {
        types: ['LOAD_ROUNDS_REQUEST', 'LOAD_ROUNDS_SUCCESS', 'LOAD_ROUNDS_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}rounds`, config),
        payload: {}
    };
}

/* Chat */
export const SOCKET_LOAD_CHATMESSAGES_REQUEST = 'SOCKET_LOAD_CHATMESSAGES_REQUEST';
export const SOCKET_LOAD_CHATMESSAGES_SUCCESS = 'SOCKET_LOAD_CHATMESSAGES_SUCCESS';

export const SOCKET_POST_CHATMESSAGE_REQUEST = 'SOCKET_POST_CHATMESSAGE_REQUEST';
export const SOCKET_POST_CHATMESSAGE_SUCCESS = 'SOCKET_POST_CHATMESSAGE_SUCCESS';

export function loadChatMessages() {
    return {
        type: 'SOCKET_LOAD_CHATMESSAGES_REQUEST'
    };
}

export function receivedChatMessages(messages) {
    return {
        type: 'SOCKET_LOAD_CHATMESSAGES_SUCCESS',
        messages
    };
}

export function postChatMessage(data) {
    return {
        type: 'SOCKET_POST_CHATMESSAGE_REQUEST',
        data
    };
}

export function postChatMessageSuccess(message) {
    return {
        type: 'SOCKET_POST_CHATMESSAGE_SUCCESS',
        message
    };
}

/* Penalty Survey */
export const LOAD_PENALTYSURVEYRESULTS_REQUEST = 'LOAD_PENALTYSURVEYRESULTS_REQUEST';
export const LOAD_PENALTYSURVEYRESULTS_SUCCESS = 'LOAD_PENALTYSURVEYRESULTS_SUCCESS';
export const LOAD_PENALTYSURVEYRESULTS_FAILURE = 'LOAD_PENALTYSURVEYRESULTS_FAILURE';

export function loadPenaltySurveyresults() {
    const config = getInitialConfig();
    config.method = 'GET';

    return {
        types: ['LOAD_PENALTYSURVEYRESULTS_REQUEST', 'LOAD_PENALTYSURVEYRESULTS_SUCCESS', 'LOAD_PENALTYSURVEYRESULTS_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}penaltysurvey`, config),
        payload: {}
    };
}

export const POST_PENALTYSURVEYRESULT_REQUEST = 'POST_PENALTYSURVEYRESULT_REQUEST';
export const POST_PENALTYSURVEYRESULT_SUCCESS = 'POST_PENALTYSURVEYRESULT_SUCCESS';
export const POST_PENALTYSURVEYRESULT_FAILURE = 'POST_PENALTYSURVEYRESULT_FAILURE';

export function addPenaltySurveyResult(answer) {
    const config = getInitialConfig();
    config.method = 'POST';
    config.data = answer;

    return {
        types: ['POST_PENALTYSURVEYRESULT_REQUEST', 'POST_PENALTYSURVEYRESULT_SUCCESS', 'POST_PENALTYSURVEYRESULT_FAILURE'],
        callAPI: () => $.ajax(`${API_BASE}penaltysurvey`, config),
        payload: {}
    };
}
