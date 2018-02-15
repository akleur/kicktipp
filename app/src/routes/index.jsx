import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../containers/App.jsx';

import ViewHomeContainer from '../containers/ViewHomeContainer.jsx';
import ViewKickbookContainer from '../containers/ViewKickbookContainer.jsx';
import ViewMediaContainer from '../containers/ViewMediaContainer.jsx';

import UserRegisterContainer from '../containers/UserRegisterContainer.jsx';
import UserLoginContainer from '../containers/UserLoginContainer.jsx';
import UserChangePasswordContainer from '../containers/UserChangePasswordContainer.jsx';

import TipGroupListContainer from '../containers/TipGroupListContainer.jsx';
import TipKnockoutListContainer from '../containers/TipKnockoutListContainer.jsx';
import TipEMContainer from '../containers/TipEMContainer.jsx';
import TipNextMatchesContainer from '../containers/TipNextMatchesContainer.jsx';
import ViewAllOwnTipsContainer from '../containers/ViewAllOwnTipsContainer.jsx';

import ViewGroupListContainer from '../containers/ViewGroupListContainer.jsx';
import ViewRulesContainer from '../containers/ViewRulesContainer.jsx';

import AdminMatchListContainer from '../containers/AdminMatchListContainer.jsx';
import AdminUserListContainer from '../containers/AdminUserListContainer.jsx';

import ViewMatchListContainer from '../containers/ViewMatchListContainer.jsx';
import ViewMatchAllTipsContainer from '../containers/ViewMatchAllTipsContainer.jsx';
import ViewUserAllTipsContainer from '../containers/ViewUserAllTipsContainer.jsx';

import ViewUserListContainer from '../containers/ViewUserListContainer.jsx';
import ViewEMTipStatContainer from '../containers/ViewEMTipStatContainer.jsx';


export default function getRoutes(store) {
    const authRequired = (nextState, replace) => {
        if (!localStorage.token) {
            replace('/');
        }
    };

    const emRequired = (nextState, replace) => {
        const state = store.getState();
        if (!localStorage.token || !state.auth.currentUser.mastertip) {
            replace('/login');
        }
    };

    const adminRequired = (nextState, replace) => {
        const state = store.getState();
        if (!localStorage.token || !state.auth.currentUser.admin) {
            replace('/login');
        }
    };

    return (
        <Route path="/" component={App}>
            <IndexRoute component={ViewHomeContainer}/>
            <Route path="/kickbook" component={ViewKickbookContainer} onEnter={authRequired}/>
            <Route path="/media" component={ViewMediaContainer}/>

            <Route path="/register" component={UserRegisterContainer}/>
            <Route path="/login" component={UserLoginContainer}/>
            <Route path="/password-change" component={UserChangePasswordContainer} onEnter={authRequired}/>

            <Route path="/tip-groups" component={TipGroupListContainer} onEnter={authRequired}/>
            <Route path="/tip-knockout" component={TipKnockoutListContainer} onEnter={authRequired}/>
            <Route path="/tip-em" component={TipEMContainer} onEnter={emRequired}/>
            <Route path="/tip-next" component={TipNextMatchesContainer} onEnter={authRequired}/>
            <Route path="/own-tips" component={ViewAllOwnTipsContainer} onEnter={authRequired}/>

            <Route path="/list-groups" component={ViewGroupListContainer}/>
            <Route path="/rules" component={ViewRulesContainer}/>

            <Route path="/matches" component={ViewMatchListContainer}/>
            <Route path="/match-all-tips/:spielId" component={ViewMatchAllTipsContainer} onEnter={authRequired}/>
            <Route path="/users/:userId" component={ViewUserAllTipsContainer}/>

            <Route path="/em-tips" component={ViewEMTipStatContainer}/>

            <Route path="/users" component={ViewUserListContainer} onEnter={authRequired}/>

            <Route path="/user-list-admin" component={AdminUserListContainer} onEnter={adminRequired}/>
            <Route path="/match-list-admin" component={AdminMatchListContainer} onEnter={adminRequired}/>

            <Route path="*" component={ViewHomeContainer}/>
        </Route>
    );
}

