import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setLoading, loadMatches, loadOwnTips, loadOwnJoker, loadRounds } from '../actions/actionCreators.jsx';
import OwnTipsList from '../components/User/OwnTipsList.jsx';
import CssSpinner from '../components/utils/CssSpinner.jsx';


class ViewAllOwnTipsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            matchesReady: false,
            tipReady: false,
            jokerReady: false,
            roundsReady: false,
            ownTipsByMatch: {}
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(setLoading(true));
        dispatch(loadMatches());
        dispatch(loadOwnTips());
        dispatch(loadOwnJoker());
        dispatch(loadRounds());
    }

    componentWillReceiveProps(nextProps) {
        const {
            isFetchingMatches,
            isFetchingOwnTips,
            isFetchingOwnJoker,
            isFetchingRounds
        } = this.props;
        if (isFetchingOwnTips && !nextProps.isFetchingOwnTips) {
            this.getListOfTipsByMatchId(nextProps.ownTips);
            this.setState({ tipReady: true });
        }

        if (isFetchingOwnJoker && !nextProps.isFetchingOwnJoker) {
            this.setState({ jokerReady: true });
        }

        if (isFetchingMatches && !nextProps.isFetchingMatches) {
            this.setState({ matchesReady: true });
        }

        if (isFetchingRounds && !nextProps.isFetchingRounds) {
            this.setState({ roundsReady: true });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if ((!this.state.matchesReady || !this.state.tipReady || !this.state.jokerReady || !this.state.roundsReady) && nextState.matchesReady && nextState.tipReady && nextState.jokerReady && nextState.roundsReady) {
            const { dispatch } = this.props;
            dispatch(setLoading(false));
            this.setState({
                isLoading: false
            });
        }
        return true;
    }

    getListOfTipsByMatchId(owntips) {
        const tipsByMatchList = {};
        owntips.items.forEach((tip) => {
            tipsByMatchList[tip.matchId] = tip;
        });
        this.setState({ ownTipsByMatch: tipsByMatchList });
    }

    render() {
        const {
            dispatch,
            matches,
            rounds,
            ownJoker
        } = this.props;
        const { ownTipsByMatch } = this.state;

        return (
            <div>
                {!this.state.isLoading
                    ? <OwnTipsList matches={matches.items} owntips={ownTipsByMatch} ownjoker={ownJoker.resource}
                        rounds={rounds.items} dispatch={dispatch}/>
                    : <CssSpinner/>
                }
            </div>
        );
    }
}

ViewAllOwnTipsContainer.propTypes = {
    isLoading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    matches: PropTypes.object.isRequired,
    ownTips: PropTypes.object.isRequired,
    ownJoker: PropTypes.object.isRequired,
    rounds: PropTypes.object.isRequired,
    isFetchingMatches: PropTypes.bool.isRequired,
    isFetchingOwnTips: PropTypes.bool.isRequired,
    isFetchingOwnJoker: PropTypes.bool.isRequired,
    isFetchingRounds: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    const {
        loading,
        matches,
        ownTips,
        ownJoker,
        rounds,
        auth
    } = state;
    const isFetchingMatches = matches.isFetching;
    const isFetchingOwnTips = ownTips.isFetching;
    const isFetchingOwnJoker = ownJoker.isFetching;
    const isFetchingRounds = rounds.isFetching;

    return {
        loading,
        auth,
        isFetchingMatches,
        isFetchingOwnTips,
        isFetchingOwnJoker,
        isFetchingRounds,
        matches,
        ownTips,
        ownJoker,
        rounds
    };
}

export default connect(mapStateToProps)(ViewAllOwnTipsContainer);
