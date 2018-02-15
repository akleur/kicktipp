import React, { Component, PropTypes } from 'react';
import { postOwnEmTip, updateOwnEmTip } from '../../actions/actionCreators.jsx';
import EMTipView from '../EM/EMTipView.jsx';

export default class EMTip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [
                'emtip'
            ],
            initialValues: {}
        };
    }

    handleSubmit(data) {
        const { dispatch, ownEMTip } = this.props;
        const tip = {
            teamId: data.emtip
        };
        if (ownEMTip.id) {
            tip.id = ownEMTip.id;
            return dispatch(updateOwnEmTip(tip));
        }
        return dispatch(postOwnEmTip(tip));
    }

    initializeFieldValues(ownEMTip) {
        const initialValues = {};
        if (ownEMTip.teamId) {
            initialValues.emtip = ownEMTip.teamId;
            this.setState({
                initialValues
            });
        }
    }

    componentWillMount() {
        const { ownEMTip } = this.props;
        this.initializeFieldValues(ownEMTip);
    }

    render() {
        const { ownEMTip } = this.props;
        return (
            <div>
                <EMTipView ownEMTip={ownEMTip}/>
            </div>
        );
    }
}

EMTip.propTypes = {
    teams: PropTypes.object.isRequired,
    ownEMTip: PropTypes.object.isRequired,
    currentRound: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};
