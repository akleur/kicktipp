import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setLoading, loadMatches, loadOwnTips, loadOwnJoker, loadRounds } from '../actions/actionCreators.jsx';
import TipKnockout from '../components/Matches/TipKnockout.jsx';
import CssSpinner from '../components/utils/CssSpinner.jsx';


class TipKnockoutListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            matchesReady: false,
            tipReady: false,
            jokerReady: false,
            roundsReady: false,
            ownTipsByMatch: {},
            filteredMatches: [],
            filteredRounds: []
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
            this.filterMatches(nextProps.matches);
            this.setState({ matchesReady: true });
        }

        if (isFetchingRounds && !nextProps.isFetchingRounds) {
            this.filterRounds(nextProps.rounds);
            this.setState({ roundsReady: true });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if ((!this.state.matchesReady || !this.state.tipReady || !this.state.roundsReady || !this.state.jokerReady) && nextState.matchesReady && nextState.tipReady && nextState.roundsReady && nextState.jokerReady) {
            const { dispatch } = this.props;
            dispatch(setLoading(false));
            this.setState({
                isLoading: false
            });
        }
        return true;
    }

    filterMatches(matches) {
        const filteredMatches = [];
        matches.items.forEach((match) => {
            if (match.roundId > 1) {
                filteredMatches.push(match);
            }
        });
        this.setState({ filteredMatches });
    }

    filterRounds(rounds) {
        const filteredRounds = [];
        rounds.items.forEach((round) => {
            if (round.id > 1) {
                filteredRounds.push(round);
            }
        });
        this.setState({ filteredRounds });
    }

    getListOfTipsByMatchId(owntips) {
        const tipsByMatchList = {};
        owntips.items.forEach((tip) => {
            if (tip.roundId > 1) {
                tipsByMatchList[tip.matchId] = tip;
            }
        });
        this.setState({ ownTipsByMatch: tipsByMatchList });
    }

    render() {
        const { dispatch, form, ownJoker } = this.props;
        const { ownTipsByMatch, filteredMatches, filteredRounds } = this.state;

        return (
            <div>
                {!this.state.isLoading
                    ? <TipKnockout matches={filteredMatches} form={form} owntips={ownTipsByMatch}
                                   ownjoker={ownJoker.resource} rounds={filteredRounds} dispatch={dispatch}/>
                    : <CssSpinner/>
                }
            </div>
        );
    }
}

TipKnockoutListContainer.propTypes = {
    isLoading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    matches: PropTypes.object.isRequired,
    rounds: PropTypes.object.isRequired,
    isFetchingMatches: PropTypes.bool.isRequired,
    isFetchingRounds: PropTypes.bool.isRequired,
    isFetchingOwnTips: PropTypes.bool.isRequired,
    isFetchingOwnJoker: PropTypes.bool.isRequired,
    form: PropTypes.object.isRequired
};

TipKnockoutListContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const {
        loading,
        matches,
        ownTips,
        ownJoker,
        rounds,
        form,
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
        rounds,
        form
    };
}

export default connect(mapStateToProps)(TipKnockoutListContainer);
