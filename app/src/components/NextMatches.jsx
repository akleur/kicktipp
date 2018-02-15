import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadOwnTips, loadOwnJoker } from '../actions/actionCreators.jsx';
import NavLink from './Navigation/NavLink.jsx';
import MatchDiv from './Matches/MatchDiv.jsx';
import CssSpinner from './utils/CssSpinner.jsx';

class NextMatches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            filteredTips: []
        };
    }

    componentWillMount() {
        const { dispatch, isAuthenticated } = this.props;
        if (isAuthenticated) {
            dispatch(loadOwnTips());
            dispatch(loadOwnJoker());
        } else {
            this.setState({
                isLoading: false
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { isFetchingOwnTips, isFetchingOwnJoker } = this.props;

        if ((isFetchingOwnTips || isFetchingOwnJoker) && !nextProps.isFetchingOwnTips && !nextProps.isFetchingOwnJoker) {
            this.filterNextTips(nextProps.ownTips);
            this.setState({
                isLoading: false
            });
        }
    }

    filterNextTips(ownTips) {
        const { filteredMatches } = this.props;
        const filteredTips = {};
        const tipList = ownTips.items;
        for (let i = 0, len = filteredMatches.length; i < len; i++) {
            tipList.map((tip) => {
                if (tip.matchId === filteredMatches[i].id) {
                    filteredTips[tip.matchId] = {};
                    filteredTips[tip.matchId].tipTeamA = tip.tipTeamA.toString();
                    filteredTips[tip.matchId].tipTeamB = tip.tipTeamB.toString();
                }
            });
        }
        this.setState({
            filteredTips
        });
    }

    render() {
        const { filteredMatches, isAuthenticated, ownJoker } = this.props;
        const { filteredTips, isLoading } = this.state;

        return (
            <div>
                {!isLoading
                    ? <div className="phone-padding">
                        <div className="callout secondary matches-next">
                            {filteredMatches.map((match, idx) => {
                                const joker = (ownJoker.resource.matchId === match.id);
                                const tip = (filteredTips[match.id]) ? filteredTips[match.id] : {};
                                return (
                                    <MatchDiv
                                        match={match}
                                        tip={tip}
                                        joker={joker}
                                        key={idx}
                                    />
                                );
                            })}
                            <p>
                                {isAuthenticated
                                    ? <NavLink to='/tip-next'>Die nächsten Spiele tippen</NavLink>
                                    : ''
                                }
                            </p>
                        </div>
                    </div>
                    : <CssSpinner/>
                }
            </div>
        );
    }
}

NextMatches.propTypes = {
    filteredMatches: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isFetchingOwnTips: PropTypes.bool.isRequired,
    ownTips: PropTypes.object.isRequired,
    isFetchingOwnJoker: PropTypes.bool.isRequired,
    ownJoker: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const { auth, ownTips, ownJoker } = state;
    const { isAuthenticated } = auth;
    const isFetchingOwnTips = ownTips.isFetching;
    const isFetchingOwnJoker = ownJoker.isFetching;

    return {
        isAuthenticated,
        isFetchingOwnTips,
        isFetchingOwnJoker,
        ownTips,
        ownJoker
    };
}

export default connect(mapStateToProps)(NextMatches);
