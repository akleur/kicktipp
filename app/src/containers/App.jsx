import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
/*
import { browserHistory } from 'react-router';
import { setLoading, getAppVersion } from '../actions/actionCreators.jsx';
*/
import NavigationContainer from './NavigationContainer.jsx';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldReload: false
        };
    }

    componentWillMount() {
        // -- Jump to newSite after update
        /*
        if(localStorage.newPath) {
              console.log('should reload', localStorage.newPath);
              browserHistory.push(localStorage.newPath);
              localStorage.removeItem("newPath");
            }
            */
    }


/*    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            const { dispatch } = this.props;
            dispatch(getAppVersion());

            if (this.state.shouldReload === true) {
                this.setState({
                    shouldReload: false
                });
                localStorage.setItem('newPath', nextProps.location.pathname);
                window.location.href = localStorage.newPath;
            }
        }

        if (this.props.isFetchingVersion === true && nextProps.isFetchingVersion === false) {
            if (this.props.applicationVersion !== '' && this.props.applicationVersion !== nextProps.applicationVersion) {
                this.setState({
                    shouldReload: true
                });
                console.log('app reloaded due to newer version');
            }
        }
    } */


    render() {
        const { isAuthenticated, currentUser, message } = this.props;
        return (
            <div>
                <NavigationContainer
                    isAuthenticated={isAuthenticated}
                    currentUser={currentUser}
                    message={message}
                    content={this.props.children}
                    path={this.props.location.pathname}
                />
            </div>
        );
    }
}

App.propTypes = {
    applicationVersion: PropTypes.string.isRequired,
    isFetchingVersion: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool,
    message: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

App.contextTypes = {
    history: React.PropTypes.object
};

function mapStateToProps(state) {
    const {
        loading,
        message,
        auth,
        appVersion
    } = state;
    const { isLoading } = loading;
    const { isAuthenticated, currentUser } = auth;
    const applicationVersion = appVersion.version;
    const isFetchingVersion = appVersion.isFetching;

    return {
        isFetchingVersion,
        applicationVersion,
        isLoading,
        message,
        isAuthenticated,
        currentUser
    };
}

export default connect(mapStateToProps)(App);
