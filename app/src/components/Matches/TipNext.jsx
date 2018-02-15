import React, { Component, PropTypes } from 'react';
import { postOwnTips, postOwnJoker, updateOwnJoker } from '../../actions/actionCreators.jsx';
import { createTipListForPost, getCurrentDate } from '../../utils/tipUtils.jsx';
import TipNextForm from './TipNextForm.jsx';


export default class TipNext extends Component {
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
        const { dispatch, ownjoker } = this.props;
        const formReducer = this.props.form.tipsNext;
        if (formReducer) {
            if (data.joker !== '') {
                const joker = {
                    matchId: data.joker
                };
                if (ownjoker.id) {
                    joker.id = ownjoker.id;
                    dispatch(updateOwnJoker(joker));
                } else {
                    dispatch(postOwnJoker(joker));
                }
            }
            const tipList = createTipListForPost(formReducer, data);
            if (tipList.length > 0) {
                return dispatch(postOwnTips(tipList));
            }
            return false;
        }
        return false;
    }

    initializeFields(matches, ownjoker) {
        const { todayDate } = this.state;
        const fields = {};
        const fieldsReadOnly = {};
        matches.forEach((match) => {
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

        if (ownjoker.matchId) {
            const matchDate = new Date(ownjoker.matchDate).getTime();
            if (matchDate > todayDate) {
                fields.joker = true;
            } else {
                fieldsReadOnly.joker = '';
            }
        } else {
            fields.joker = true;
        }

        this.fields = Object
            .keys(fields)
            .filter(field => fields[field]);
        this.fieldsReadOnly = fieldsReadOnly;
    }

    initializeFieldValues(owntips, ownjoker) {
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

        if (ownjoker.matchId) {
            const matchDate = new Date(ownjoker.matchDate).getTime();
            if (matchDate > todayDate) {
                initialValues.joker = ownjoker.matchId;
            } else {
                this.fieldsReadOnly.joker = '';
            }
        } else {
            this.fieldsReadOnly.joker = '';
        }

        this.initialValues = initialValues;
    }

    componentWillMount() {
        const { matches, owntips, ownjoker } = this.props;
        this.initializeFields(matches, ownjoker);
        this.initializeFieldValues(owntips, ownjoker);
    }

    render() {
        return (
            <div>
                <TipNextForm
                    matches={this.props.matches}
                    owntips={this.props.owntips}
                    ownjoker={this.props.ownjoker}
                    fields={this.fields}
                    initialValues={this.initialValues}
                    fieldsReadOnly={this.fieldsReadOnly}
                    onSubmit={this.handleSubmit.bind(this)}
                    joker="false"/>
            </div>
        );
    }
}

TipNext.propTypes = {
    matches: PropTypes.array.isRequired,
    owntips: PropTypes.object.isRequired,
    ownjoker: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired
};
