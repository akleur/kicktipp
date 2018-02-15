import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadMatches, loadOwnTips, loadOwnJoker } from '../actions/actionCreators.jsx';
import TipNext from '../components/Matches/TipNext.jsx';
import CssSpinner from '../components/utils/CssSpinner.jsx';


class TipNextMatchesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            ownTipsByMatch: {},
            filteredMatches: []
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(loadMatches());
        dispatch(loadOwnTips());
        dispatch(loadOwnJoker());
    }

    componentWillReceiveProps(nextProps) {
        const { isFetchingMatches, isFetchingOwnTips, isFetchingOwnJoker } = this.props;
        if (isFetchingOwnTips && !nextProps.isFetchingOwnTips) {
            this.getListOfTipsByMatchId(nextProps.ownTips);
        }

        if (isFetchingMatches && !nextProps.isFetchingMatches) {
            this.filterMatches(nextProps.matches);
        }

        if ((isFetchingMatches || isFetchingOwnTips || isFetchingOwnJoker) && !nextProps.isFetchingMatches && !nextProps.isFetchingOwnTips && !nextProps.isFetchingOwnJoker) {
            this.setState({
                isLoading: false
            });
        }
    }

    filterMatches(matches) {
        const filteredMatches = [];
        const matchList = matches.items;
        for (let i = 0, len = matchList.length; i < len; i++) {
            if (new Date(matchList[i].date).getTime() > new Date().getTime()) {
                filteredMatches.push(matchList[i]);
                if (filteredMatches.length > 5) {
                    break;
                }
            }
        }
        this.setState({ filteredMatches });
    }

    getListOfTipsByMatchId(owntips) {
        const tipsByMatchList = {};
        owntips.items.forEach((tip) => {
            tipsByMatchList[tip.matchId] = tip;
        });
        this.setState({ ownTipsByMatch: tipsByMatchList });
    }

    render() {
        const { dispatch, form, ownJoker } = this.props;
        const { ownTipsByMatch, filteredMatches } = this.state;

        return (
            <div>
                {!this.state.isLoading
                    ?
                    <TipNext matches={filteredMatches} form={form} owntips={ownTipsByMatch} ownjoker={ownJoker.resource}
                             dispatch={dispatch}/>
                    : <CssSpinner/>
                }
            </div>
        );
    }
}

TipNextMatchesContainer.propTypes = {
    isLoading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    matches: PropTypes.object.isRequired,
    ownTips: PropTypes.object.isRequired,
    ownJoker: PropTypes.object.isRequired,
    isFetchingMatches: PropTypes.bool.isRequired,
    isFetchingOwnTips: PropTypes.bool.isRequired,
    isFetchingOwnJoker: PropTypes.bool.isRequired,
    form: PropTypes.object.isRequired
};

TipNextMatchesContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const {
        loading,
        matches,
        ownTips,
        ownJoker,
        form,
        auth
    } = state;
    const isFetchingMatches = matches.isFetching;
    const isFetchingOwnJoker = ownJoker.isFetching;
    const isFetchingOwnTips = ownTips.isFetching;

    return {
        loading,
        auth,
        isFetchingMatches,
        isFetchingOwnTips,
        isFetchingOwnJoker,
        matches,
        ownTips,
        ownJoker,
        form
    };
}

export default connect(mapStateToProps)(TipNextMatchesContainer);
