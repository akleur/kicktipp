import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { loadMatches, loadMatchTips } from '../actions/actionCreators.jsx';
import TipList from '../components/Matches/TipList.jsx';
import CssSpinner from '../components/utils/CssSpinner.jsx';

class ViewMatchAllTipsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            matchesReady: false,
            tipsReady: false,
            currentMatch: {}
        };
    }

    componentWillMount() {
        const { dispatch, params } = this.props;
        if (!params || !params.spielId) {
            browserHistory.push('/matches');
        }
        dispatch(loadMatchTips(params.spielId));
        dispatch(loadMatches());
    }

    componentWillReceiveProps(nextProps) {
        const { isFetchingMatches, isFetchingMatchTips } = this.props;

        if ((isFetchingMatchTips || isFetchingMatches) && !nextProps.isFetchingMatchTips && !nextProps.isFetchingMatches) {
            this.filterCurrentMatch(nextProps.matches.items);
            this.setState({
                isLoading: false
            });
        }
    }

    filterCurrentMatch(matches) {
        const { params } = this.props;
        let currentMatchFiltered = [];
        currentMatchFiltered = matches.filter(match => match.id === parseInt(params.spielId, 10));
        if (currentMatchFiltered.length === 1) {
            this.setState({
                currentMatch: currentMatchFiltered[0]
            });
        }
    }

    render() {
        const { selectedMatchTips, currentUser } = this.props;
        const { currentMatch } = this.state;

        return (
            <div>
                <h1>Tippliste</h1>
                {!this.state.isLoading
                    ? <TipList match={currentMatch} tips={selectedMatchTips} currentUser={currentUser} />
                    : <CssSpinner />
                }
            </div>
        );
    }
}

ViewMatchAllTipsContainer.propTypes = {
    params: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    isFetchingMatches: PropTypes.bool.isRequired,
    matches: PropTypes.object.isRequired,
    isFetchingMatchTips: PropTypes.bool.isRequired,
    selectedMatchTips: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    const { matches, auth } = state;
    const isFetchingMatches = matches.isFetching;
    const { isFetchingMatchTips } = matches;
    const { selectedMatchTips } = matches;
    const { currentUser } = auth;

    return {
        matches,
        isFetchingMatches,
        isFetchingMatchTips,
        selectedMatchTips,
        currentUser
    };
}

export default connect(mapStateToProps)(ViewMatchAllTipsContainer);
