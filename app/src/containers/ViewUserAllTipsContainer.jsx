import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { loadUserTips } from '../actions/actionCreators.jsx';
import TipListUser from '../components/User/TipListUser.jsx';
import CssSpinner from '../components/utils/CssSpinner.jsx';

class ViewUserAllTipsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            tipListForUser: [],
            username: ''
        };
    }

    componentWillMount() {
        const { dispatch, params } = this.props;
        if (!params || !params.userId) {
            browserHistory.push('/users');
        }
        dispatch(loadUserTips(params.userId));
    }

    componentWillReceiveProps(nextProps) {
        const { isFetchingUserTips, params } = this.props;

        if (isFetchingUserTips && !nextProps.isFetchingUserTips) {
            const tipListForUser = nextProps.tipListUser[params.userId];
            let username = '';
            if (tipListForUser.length) {
                username = tipListForUser[0].username;
            }
            this.setState({
                tipListForUser,
                isLoading: false,
                username
            });
        }
    }

    render() {
        const { tipListForUser, username } = this.state;

        return (
            <div>
                <h1>{username}</h1>
                {!this.state.isLoading
                    ? <TipListUser tips={tipListForUser} />
                    : <CssSpinner />
                }
            </div>
        );
    }
}

ViewUserAllTipsContainer.propTypes = {
    params: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    tipListUser: PropTypes.object.isRequired,
    isFetchingUserTips: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    const { userTips } = state;
    const isFetchingUserTips = userTips.isFetching;
    const { tipListUser } = userTips;

    return {
        tipListUser,
        isFetchingUserTips
    };
}

export default connect(mapStateToProps)(ViewUserAllTipsContainer);
