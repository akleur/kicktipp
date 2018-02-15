import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadMatches } from '../actions/actionCreators.jsx';
import MatchList from '../components/Matches/MatchList.jsx';
import CssSpinner from '../components/utils/CssSpinner.jsx';

class ViewMatchListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(loadMatches());
    }

    componentWillReceiveProps(nextProps) {
        const { isFetchingMatches } = this.props;
        if (isFetchingMatches && !nextProps.isFetchingMatches) {
            this.setState({
                isLoading: false
            });
        }
    }

    render() {
        const { matches } = this.props;

        return (
            <div>
                <h1>Spielliste</h1>
                {!this.state.isLoading
                    ? <MatchList matches={matches.items}/>
                    : <CssSpinner/>
                }
            </div>
        );
    }
}

ViewMatchListContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetchingMatches: PropTypes.bool.isRequired,
    matches: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const { matches } = state;
    const isFetchingMatches = matches.isFetching;

    return {
        matches,
        isFetchingMatches
    };
}

export default connect(mapStateToProps)(ViewMatchListContainer);
