import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
/*
import { RouteHandler } from 'react-router';
*/
import { logoutUser, setMessage, loadCurrentRound } from '../actions/actionCreators.jsx';
import Navigation from '../components/Navigation/Navigation.jsx';
import Content from '../components/Content.jsx';
import MessageBox from '../components/MessageBox.jsx';
import ScrollToTop from '../components/Navigation/ScrollToTop.jsx';


export class NavContainer extends Component {
    constructor(props) {
        super(props);

        this.buildMenu = this.buildMenu.bind(this);
        this.startSpinner = this.startSpinner.bind(this);
        this.menuItemsLeft = [];
        this.menuItemsRight = [];

        this.time = 1;

        this.state = {
            isLoading: true,
            roundReady: false,
            menuItemsLeft: this.menuItemsLeft,
            menuItemsRight: this.menuItemsRight,
            loadingClass: 'show-loading'
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(loadCurrentRound());
    }

    componentDidMount() {
        this.buildMenu(this.props);
    }

    componentDidUpdate() {
        this.closeMenus();
    }

    componentWillReceiveProps(nextProps) {
        const { isFetchingCurrentRound } = this.props;
        if (isFetchingCurrentRound && !nextProps.isFetchingCurrentRound) {
            this.setState({
                roundReady: true
            });
        }
        /** Possible Attributes
         'title'           : String,
         'path'            : String,
         'onClick'         : Function,
         'extraAttribute'  : String,
         'userLevel'       : Number (0 = Unauthenticated, 1 = Authenticated, 2 = Auth + Mastertip, 3 = Admin),
         'subItems'        : Array
         'roundLevel'      : Number (Round id to show the item)
         'className'       : String
         */

        this.menuItemsLeft = [
            {
                'title': 'Übersicht',
                'path': '/',
                'userLevel': 0,
                'subItems': [
                    {
                        'title': 'Home',
                        'path': '/',
                        'userLevel': 0
                    },
                    {
                        'title': 'Spielregeln',
                        'path': '/rules',
                        'userLevel': 0
                    },
                    {
                        'title': 'Videos',
                        'path': '/media',
                        'userLevel': 0
                    }
                ]
            },
            {
                'title': '',
                'path': '/',
                'userLevel': 1,
                'className': 'hide'
            },
            {
                'title': '',
                'path': '/',
                'userLevel': 1,
                'className': 'hide'
            },
            {
                'title': 'Rangliste',
                'path': '/users',
                'userLevel': 1
            },
            {
                'title': 'Kickbook',
                'path': '/kickbook',
                'userLevel': 1
            },
            {
                'title': 'Spiele',
                'path': '/',
                'userLevel': 1,
                'subItems': [
                    {
                        'title': 'Gruppen',
                        'path': '/list-groups',
                        'userLevel': 0
                    },
                    {
                        'title': 'Spielliste',
                        'path': '/matches',
                        'userLevel': 0,
                        'roundLevel': 0
                    },
                    {
                        'title': 'EM-Tipps',
                        'path': '/em-tips',
                        'userLevel': 1,
                        'roundLevel': 0
                    }
                ]
            }
        ];

        this.menuItemsRight = [
            {
                'title': '',
                'path': '/',
                'userLevel': 1,
                'className': 'hide'
            },
            {
                'title': nextProps.currentUser.username,
                'path': '/',
                'userLevel': 1,
                'subItems': [
                    {
                        'title': 'Passwort ändern',
                        'path': '/password-change',
                        'userLevel': 1
                    },
                    {
                        'title': 'Ergebnis eintragen',
                        'path': '/match-list-admin',
                        'userLevel': 3
                    },
                    {
                        'title': 'User Liste',
                        'path': '/user-list-admin',
                        'userLevel': 3
                    },
                    {
                        'title': 'User Registrieren',
                        'path': '/register',
                        'userLevel': 3
                    }
                ]
            },
            {
                'title': 'Tippen',
                'path': '/',
                'userLevel': 1,
                'subItems': [
                    {
                        'title': 'Deine Tipps ansehen',
                        'path': '/own-tips',
                        'userLevel': 1
                    },
                    {
                        'title': 'Vorrunde',
                        'path': '/tip-groups',
                        'userLevel': 1
                    },
                    {
                        'title': 'Finalrunden',
                        'path': '/tip-knockout',
                        'userLevel': 1
                    },
                    {
                        'title': 'EM-Tipp',
                        'path': '/tip-em',
                        'userLevel': 2
                    }
                ]
            },
            {
                'title': '',
                'path': '/',
                'userLevel': 1,
                'className': 'hide'
            },
            {
                'title': 'Registrieren',
                'path': '/register',
                'userLevel': 0,
                'className': nextProps.isAuthenticated ? 'hide' : 'show'
            },
            {
                'title': nextProps.isAuthenticated ? 'Logout' : 'Login',
                'path': '/login',
                'onClick': nextProps.isAuthenticated ? this.handleLogout.bind(this) : null,
                'userLevel': 0
            }
        ];


        if (this.props.isAuthenticated !== nextProps.isAuthenticated || !nextProps.isAuthenticated) {
            this.buildMenu(nextProps);
            this.closeMenus();
        }
        window.setTimeout(this.startSpinner, 1000);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { roundReady } = this.state;
        if (!roundReady && nextState.roundReady) {
            this.setState({
                isLoading: false
            });
            this.buildMenu(nextProps);
        }
        return true;
    }

    startSpinner() {
        this.setState({
            loadingClass: this.props.isLoading ? 'show-loading' : 'hide-loading'
        });
    }

    closeMenus() {
/*        if ($('#offCanvasLeft').length) {
            $('#offCanvasLeft').foundation('close');
        }
        if ($('#offCanvasRight').length) {
            $('#offCanvasRight').foundation('close');
        }*/
    }

    buildMenu(props) {
        const { isAuthenticated, currentUser, currentRound } = props;

        let userLevel = 0;

        if (isAuthenticated) {
            userLevel = 1;
        }

        if (currentUser.mastertip) {
            userLevel = 2;
        }

        if (currentUser.admin) {
            userLevel = 3;
        }

        const filteredItemsLeft = this.filterItems(
            this.menuItemsLeft,
            userLevel,
            currentRound.id
        );

        const filteredItemsRight = this.filterItems(
            this.menuItemsRight,
            userLevel,
            currentRound.id
        );

        this.setState({
            menuItemsLeft: filteredItemsLeft,
            menuItemsRight: filteredItemsRight
        });

        return false;
    }

    filterItems(items, userLevel, roundId) {
        const filteredItems = items.filter((i) => {
            const item = i;
            if (item.subItems) {
                const filteredSubItems = item.subItems.filter((subItem) => {
                    if (subItem.roundLevel && subItem.roundLevel > roundId) {
                        return false;
                    }
                    return subItem.userLevel <= userLevel;
                });
                item.subItems = filteredSubItems;
                if (item.subItems.length > 0) {
                    return item;
                }
            } else {
                if (item.roundLevel && item.roundLevel > roundId) {
                    return false;
                }
                if (userLevel > 0 && item.userLevel === -1) {
                    return false;
                }
                return item.userLevel <= userLevel;
            }
        });

        return filteredItems;
    }

    handleLogout() {
        this.props.dispatch(logoutUser());
        this.props.dispatch(setMessage(false, 'Logout erfolgreich!'));
    }

    render() {
        const { isLoading } = this.state;
        return (
            <div>
                <ScrollToTop/>
                <MessageBox message={this.props.message}/>
                <div className="off-canvas-wrapper">
                    <div className="off-canvas-wrapper-inner" data-off-canvas-wrapper>
                        <Navigation
                            menuItemsLeft={this.state.menuItemsLeft}
                            menuItemsRight={this.state.menuItemsRight}
                            isAuthenticated={this.props.isAuthenticated}
                            currentUser={this.props.currentUser}
                        />
                        {/* <BigSpinner content="Loading..." showClass={this.state.loadingClass} isLoading={this.props.isLoading} /> */}
                        <div className="off-canvas-content" data-off-canvas-content>
                            {!isLoading &&
                            <Content path={this.props.path} content={this.props.content} {...this.props}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NavContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
    message: PropTypes.object,
    isFetchingCurrentRound: PropTypes.bool.isRequired,
    currentRound: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const {
        loading,
        auth,
        message,
        rounds
    } = state;
    const { isLoading } = loading;
    const { isAuthenticated, currentUser } = auth;
    const { isFetchingCurrentRound } = rounds;
    const currentRound = rounds.current;

    return {
        isLoading,
        isAuthenticated,
        currentUser,
        message,
        isFetchingCurrentRound,
        currentRound
    };
}

export default connect(mapStateToProps)(NavContainer);
