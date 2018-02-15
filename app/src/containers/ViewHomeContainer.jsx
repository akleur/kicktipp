import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadMatches } from '../actions/actionCreators.jsx';
import NextMatches from '../components/NextMatches.jsx';
import Intro from '../components/Intro.jsx';
import NewsWidget from '../components/Widgets/NewsWidget.jsx';
import PenaltySurveyContainer from './PenaltySurveyContainer.jsx';
import CssSpinner from '../components/utils/CssSpinner.jsx';

class ViewHomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            filteredMatches: []
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(loadMatches());
    }

    componentWillReceiveProps(nextProps) {
        const { isFetchingMatches } = this.props;

        if (isFetchingMatches && !nextProps.isFetchingMatches) {
            this.filterNextMatches(nextProps.matches);
            this.setState({
                isLoading: false
            });
        }
    }

    filterNextMatches(matches) {
        const filteredMatches = [];
        const matchList = matches.items;
        for (let i = 0, len = matchList.length; i < len; i++) {
            if (new Date(matchList[i].date).getTime() > new Date().getTime()) {
                filteredMatches.push(matchList[i]);
                if (filteredMatches.length === 3) {
                    break;
                }
            }
        }
        this.setState({ filteredMatches });
    }

    render() {
        const { isAuthenticated } = this.props;
        const { filteredMatches, isLoading } = this.state;
        return (
            <div>
                <h1 className="align-center">Kicktipp 2016</h1>
                {!isLoading
                    ? <NextMatches filteredMatches={filteredMatches} isAuthenticated={isAuthenticated}/>
                    : <CssSpinner/>
                }
                <Intro/>
                <PenaltySurveyContainer/>
                <h2>News</h2>
                <NewsWidget/>
            </div>
        );
    }
}

ViewHomeContainer.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired,
    isFetchingMatches: PropTypes.bool.isRequired
};


function mapStateToProps(state) {
    const { auth, matches } = state;
    const { isAuthenticated, currentUser } = auth;
    const isFetchingMatches = matches.isFetching;

    return {
        isAuthenticated,
        isFetchingMatches,
        matches,
        currentUser
    };
}

export default connect(mapStateToProps)(ViewHomeContainer);
