import React, { Component, PropTypes } from 'react';
import { postOwnTips } from '../../actions/actionCreators.jsx';
import { createTipListForPost, getCurrentDate } from '../../utils/tipUtils.jsx';
import FirstRoundTabs from './FirstRoundTabs.jsx';

export default class TipGroups extends Component {
    constructor(props) {
        super(props);
        this.fields = {};
        this.initialValues = {};
        this.fieldsReadOnly = {};
        const todayDate = getCurrentDate();
        this.state = {
            todayDate
        };
    }

    handleSubmit(data) {
        const formReducer = this.props.form.tips;
        if (formReducer) {
            const tipList = createTipListForPost(formReducer, data);
            if (tipList.length > 0) {
                return this.props.dispatch(postOwnTips(tipList));
            }
            return false;
        }
        return false;
    }

    initializeFields(groups) {
        const { todayDate } = this.state;
        const fields = {};
        const fieldsReadOnly = {};
        groups.items.forEach((group) => {
            group.matches.forEach((match) => {
                const matchDate = new Date(match.date).getTime();
                const fieldTipA = `${match.id}-tipTeamA`;
                const fieldTipB = `${match.id}-tipTeamB`;
                if (matchDate > todayDate) {
                    fields[fieldTipA] = true;
                    fields[fieldTipB] = true;
                } else {
                    fieldsReadOnly[fieldTipA] = '';
                    fieldsReadOnly[fieldTipB] = '';
                }
            });
        });

        this.fields = Object
            .keys(fields)
            .filter(field => fields[field]);
        this.fieldsReadOnly = fieldsReadOnly;
    }

    initializeFieldValues(owntips) {
        const { todayDate } = this.state;
        const initialValues = {};
        Object.keys(owntips).forEach((prop) => {
            const value = owntips[prop];
            const matchDate = new Date(value.matchDate).getTime();
            const fieldTipA = `${value.matchId}-tipTeamA`;
            const fieldTipB = `${value.matchId}-tipTeamB`;
            if (matchDate > todayDate) {
                initialValues[fieldTipA] = value.tipTeamA;
                initialValues[fieldTipB] = value.tipTeamB;
            } else {
                this.fieldsReadOnly[fieldTipA] = value.tipTeamA.toString();
                this.fieldsReadOnly[fieldTipB] = value.tipTeamB.toString();
            }
        });

        this.initialValues = initialValues;
    }

    componentWillMount() {
        const { groups, owntips } = this.props;
        this.initializeFields(groups);
        this.initializeFieldValues(owntips);
    }

    render() {
        return (
            <div>
                <FirstRoundTabs
                    groups={this.props.groups}
                    owntips={this.props.owntips}
                    currentRound={this.props.currentRound}
                    fields={this.fields}
                    initialValues={this.initialValues}
                    fieldsReadOnly={this.fieldsReadOnly}
                    onSubmit={this.handleSubmit.bind(this)}
                    joker="false"/>
            </div>
        );
    }
}

TipGroups.propTypes = {
    groups: PropTypes.object.isRequired,
    owntips: PropTypes.object.isRequired,
    currentRound: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired
};
