import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadEMTipTeams } from '../actions/actionCreators.jsx';
import EmTipTeamList from '../components/EM/EmTipTeamList.jsx';
import CssSpinner from '../components/utils/CssSpinner.jsx';


class ViewEMTipStatContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(loadEMTipTeams());
    }

    componentWillReceiveProps(nextProps) {
        const { isFetchingEMTipTeams } = this.props;
        if (isFetchingEMTipTeams && !nextProps.isFetchingEMTipTeams) {
            this.setState({
                isLoading: false
            });
        }
    }

    render() {
        const { emTipTeams, currentRound, currentUser } = this.props;

        return (
            <div>
                <h1>EM Tipps</h1>
                {!this.state.isLoading
                    ? <EmTipTeamList emTipTeams={emTipTeams.items} countEMTipTeams={emTipTeams.count}
                                     currentUser={currentUser} currentRound={currentRound}/>
                    : <CssSpinner/>
                }
            </div>
        );
    }
}

ViewEMTipStatContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetchingEMTipTeams: PropTypes.bool.isRequired,
    emTipTeams: PropTypes.object.isRequired,
    currentRound: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const { emTipTeams, rounds, auth } = state;
    const isFetchingEMTipTeams = emTipTeams.isFetching;
    const currentRound = rounds.current;
    const { currentUser } = auth;

    return {
        emTipTeams,
        isFetchingEMTipTeams,
        currentRound,
        currentUser
    };
}

export default connect(mapStateToProps)(ViewEMTipStatContainer);
