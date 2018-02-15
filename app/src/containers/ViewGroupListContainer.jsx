import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setLoading, loadGroups } from '../actions/actionCreators.jsx';
import GroupsOverview from '../components/Teams/GroupsOverview.jsx';
import CssSpinner from '../components/utils/CssSpinner.jsx';


class ViewGroupListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            groupsReady: false
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(setLoading(true));
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(loadGroups());
    }

    componentWillReceiveProps(nextProps) {
        const { isFetchingGroups } = this.props;

        if (isFetchingGroups && !nextProps.isFetchingGroups) {
            this.setState({ groupsReady: true });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!this.state.groupsReady && nextState.groupsReady) {
            const { dispatch } = this.props;
            dispatch(setLoading(false));
            this.setState({
                isLoading: false
            });
        }
        return true;
    }

    render() {
        const { groups } = this.props;

        return (
            <div>
                {this.state.groupsReady
                    ? <GroupsOverview groups={groups}/>
                    : <CssSpinner/>
                }
            </div>
        );
    }
}

ViewGroupListContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    groups: PropTypes.object.isRequired,
    isFetchingGroups: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    const { groups } = state;
    const isFetchingGroups = groups.isFetching;

    return {
        isFetchingGroups,
        groups
    };
}

export default connect(mapStateToProps)(ViewGroupListContainer);
