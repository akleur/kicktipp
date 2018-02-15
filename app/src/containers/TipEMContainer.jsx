import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadTeams, loadOwnEmTip } from '../actions/actionCreators.jsx';
import EMTip from '../components/EM/EMTip.jsx';
import CssSpinner from '../components/utils/CssSpinner.jsx';


class TipEMContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamsReady: false,
            tipReady: false
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(loadTeams());
        dispatch(loadOwnEmTip());
    }

    componentWillReceiveProps(nextProps) {
        const { isFetchingTeams, isFetchingOwnEMTip } = this.props;
        if (isFetchingTeams && !nextProps.isFetchingTeams) {
            this.setState({ teamsReady: true });
        }
        if (isFetchingOwnEMTip && !nextProps.isFetchingOwnEMTip) {
            this.setState({ tipReady: true });
        }
    }

    render() {
        const {
            dispatch,
            teams,
            EMTipData,
            currentRound
        } = this.props;
        const { teamsReady, tipReady } = this.state;

        return (
            <div>
                {(teamsReady && tipReady)
                    ? <EMTip teams={teams} ownEMTip={EMTipData} currentRound={currentRound} dispatch={dispatch}/>
                    : <CssSpinner/>
                }
            </div>
        );
    }
}

TipEMContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    teams: PropTypes.object.isRequired,
    isFetchingTeams: PropTypes.bool.isRequired,
    EMTipData: PropTypes.object.isRequired,
    currentRound: PropTypes.object.isRequired,
    isFetchingOwnEMTip: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    const { teams, ownEMTip, rounds } = state;
    const isFetchingTeams = teams.isFetching;
    const isFetchingOwnEMTip = ownEMTip.isFetching;
    const EMTipData = ownEMTip.resource;
    const currentRound = rounds.current;

    return {
        teams,
        isFetchingTeams,
        EMTipData,
        isFetchingOwnEMTip,
        currentRound
    };
}

export default connect(mapStateToProps)(TipEMContainer);
