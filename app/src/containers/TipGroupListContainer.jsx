import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setLoading, loadGroups, loadOwnTips } from '../actions/actionCreators.jsx';
import TipGroups from '../components/Matches/TipGroups.jsx';
import CssSpinner from '../components/utils/CssSpinner.jsx';


class TipGroupListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            groupsReady: false,
            tipReady: false,
            ownTipsByMatch: {}
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(setLoading(true));
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(loadGroups());
        dispatch(loadOwnTips());
    }

    componentWillReceiveProps(nextProps) {
        const { isFetchingGroups, isFetchingOwnTips } = this.props;
        if (isFetchingOwnTips && !nextProps.isFetchingOwnTips) {
            this.getListOfTipsByMatchId(nextProps.ownTips);
            this.setState({ tipReady: true });
        }

        if (isFetchingGroups && !nextProps.isFetchingGroups) {
            this.setState({ groupsReady: true });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if ((!this.state.groupsReady || !this.state.tipReady) && nextState.groupsReady && nextState.tipReady) {
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
            groups,
            currentRound,
            form
        } = this.props;

        return (
            <div>
                {!this.state.isLoading
                    ? <TipGroups groups={groups} form={form} owntips={this.state.ownTipsByMatch}
                                 currentRound={currentRound} dispatch={dispatch}/>
                    : <CssSpinner/>
                }
            </div>
        );
    }
}

TipGroupListContainer.propTypes = {
    isLoading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    groups: PropTypes.object.isRequired,
    isFetchingGroups: PropTypes.bool.isRequired,
    form: PropTypes.object.isRequired
};

TipGroupListContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const {
        loading,
        groups,
        ownTips,
        rounds,
        form,
        auth
    } = state;
    const isFetchingGroups = groups.isFetching;
    const isFetchingOwnTips = ownTips.isFetching;
    const currentRound = rounds.current;

    return {
        loading,
        auth,
        isFetchingGroups,
        isFetchingOwnTips,
        groups,
        ownTips,
        currentRound,
        form
    };
}

export default connect(mapStateToProps)(TipGroupListContainer);
