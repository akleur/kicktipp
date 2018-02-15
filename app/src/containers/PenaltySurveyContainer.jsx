import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addPenaltySurveyResult, loadPenaltySurveyresults } from '../actions/actionCreators.jsx';
import PenaltySurvey from '../components/Widgets/PenaltySurvey.jsx';
import PenaltySurveyResults from '../components/Widgets/PenaltySurveyResults.jsx';
import CssSpinner from '../components/utils/CssSpinner.jsx';

class PenaltySurveyContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(loadPenaltySurveyresults());
    }

    componentWillReceiveProps(nextProps) {
        const { isFetchingPenaltySurveyResults } = this.props;
        if (isFetchingPenaltySurveyResults && !nextProps.isFetchingPenaltySurveyResults) {
            this.setState({
                isLoading: false
            });
        }
    }

    handleSubmit(data) {
        if (typeof data.penaltyrule !== 'undefined') {
            return this.props.dispatch(addPenaltySurveyResult(data));
        }
        return false;
    }

    render() {
        const { penaltySurvey, isAuthenticated } = this.props;
        return (
            <div>
                <h2>Elfmeter Umfrage</h2>
                <div className="callout secondary">
                    {isAuthenticated
                        ? <PenaltySurvey onSubmit={this.handleSubmit.bind(this)}/>
                        : <div/>
                    }
                    {!this.state.isLoading
                        ? <PenaltySurveyResults results={penaltySurvey.items}/>
                        : <CssSpinner/>
                    }
                </div>
            </div>
        );
    }
}

PenaltySurveyContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetchingPenaltySurveyResults: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    penaltySurvey: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const { penaltySurvey, auth } = state;
    const isFetchingPenaltySurveyResults = penaltySurvey.isFetching;
    const { isAuthenticated } = auth;

    return {
        isFetchingPenaltySurveyResults,
        penaltySurvey,
        isAuthenticated
    };
}

export default connect(mapStateToProps)(PenaltySurveyContainer);
