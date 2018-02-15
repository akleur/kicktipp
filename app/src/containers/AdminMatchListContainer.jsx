import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadMatches, postScores, updateUserHistory } from '../actions/actionCreators.jsx';
import MatchListAdmin from '../components/Matches/MatchListAdmin.jsx';


class AdminMatchListContainer extends Component {
    constructor(props, context) {
        super(props);
        if (!props.auth.isAuthenticated || !props.currentUser.admin) {
            context.router.push('/');
        }
        this.isReadyToRender = false;
        this.fields = {};
        this.initialValues = {};
    }

    createScoreListForPost(formReducer, data) {
        const scoreList = [];
        let currentMatchId = 0;
        let scoreObj = {};

        Object.keys(data).forEach((prop) => {
            const formFieldObj = formReducer[prop];
            const value = data[prop];
            const arr = prop.split('-');
            const matchId = parseInt(arr[0], 10);
            const scoreTeam = arr[1];

            if (matchId !== currentMatchId) {
                scoreObj = {};
                if (typeof value !== 'undefined') {
                    scoreObj.matchId = matchId;
                    if (value === '') {
                        // Check if score needs to be deleted
                        if (formFieldObj.visited) {
                            scoreObj[scoreTeam] = -1;
                        }
                    } else if (parseInt(value, 10) > -1) {
                        scoreObj[scoreTeam] = parseInt(value, 10);
                    }
                }
                currentMatchId = matchId;
            } else if (scoreObj.matchId) {
                if (typeof value !== 'undefined') {
                    if (value === '') {
                        // Check if score needs to be deleted
                        if (formFieldObj.visited) {
                            scoreObj[scoreTeam] = -1;
                        }
                    } else if (parseInt(value, 10) > -1) {
                        scoreObj[scoreTeam] = parseInt(value, 10);
                    }
                }
            }
            const hasGoalA = Object.prototype.hasOwnProperty.call(scoreObj, 'goalsA');
            const hasGoalB = Object.prototype.hasOwnProperty.call(scoreObj, 'goalsB');
            if (scoreObj.matchId && hasGoalA && hasGoalB) {
                scoreList.push(scoreObj);
            }
        });
        return scoreList;
    }

    handleSubmit(data) {
        const formReducer = this.props.form.scores;
        if (formReducer) {
            const scoreList = this.createScoreListForPost(formReducer, data);
            if (scoreList.length > 0) {
                return this.props.dispatch(postScores(scoreList));
            }
            return false;
        }
        return false;
    }

    initializeFields(matches) {
        const fields = {};
        this.initialValues = {};
        matches.forEach((match) => {
            const { id, teamA, teamB } = match;
            const fieldGoalsA = `${id}-goalsA`;
            const fieldGoalsB = `${id}-goalsB`;
            fields[fieldGoalsA] = true;
            fields[fieldGoalsB] = true;
            this.initialValues[fieldGoalsA] = teamA.goals;
            this.initialValues[fieldGoalsB] = teamB.goals;
        });

        this.fields = Object
            .keys(fields)
            .filter(field => fields[field]);
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch } = this.props;
        if (this.props.isFetchingMatches === true && nextProps.isFetchingMatches === false) {
            this.initializeFields(nextProps.matches.items);
            this.isReadyToRender = true;
        }
        if (this.props.isPostingScores === true && nextProps.isPostingScores === false) {
            console.log('update User History');
            dispatch(updateUserHistory());
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(loadMatches());
    }

    render() {
        const { matches } = this.props;

        return (
            <div>
                {!this.isReadyToRender
                    ? <h3>Loading...</h3>
                    : <div>
                        <h1>Ergebnisse</h1>
                        <MatchListAdmin
                            matches={matches}
                            fields={this.fields}
                            initialValues={this.initialValues}
                            onSubmit={this.handleSubmit.bind(this)}
                        />
                    </div>
                }
            </div>
        );
    }
}

AdminMatchListContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetchingMatches: PropTypes.bool.isRequired,
    isPostingScores: PropTypes.bool.isRequired,
    matches: PropTypes.object.isRequired
};

AdminMatchListContainer.contextTypes = {
    router: React.PropTypes.object
};

function mapStateToProps(state) {
    const {
        matches,
        auth,
        form,
        scores
    } = state;
    const { currentUser } = auth;
    const isFetchingMatches = matches.isFetching;
    const isPostingScores = scores.isFetching;

    return {
        auth,
        form,
        currentUser,
        matches,
        isPostingScores,
        isFetchingMatches
    };
}

export default connect(mapStateToProps)(AdminMatchListContainer);
