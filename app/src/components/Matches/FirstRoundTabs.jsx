import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import MatchesTable from './MatchesTable.jsx';
import { createValidatorWithData, integer, maxLength } from '../../utils/validation.jsx';

const tipValidation = (data, props) => {
    const fieldsToValidate = {};
    props.fields.forEach((val) => {
        fieldsToValidate[val] = [integer, maxLength(2)];
    });
    return createValidatorWithData(data, fieldsToValidate);
};

class FirstRoundTabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0
        };
    }

    componentDidMount() {
        const tabs = new Foundation.Tabs($('#firstRoundTabs'));
        $('#firstRoundTabs').on('change.zf.tabs', (evt, data) => {
            this.setState({ activeTab: data[0].tabIndex });
        });
    }

    render() {
        return (
            <div>
                <h1 className="align-center">Vorrunde</h1>
                <ul className="tabs group-tabs" data-tab role="tablist" id="firstRoundTabs">
                    {this.props.groups.items.map((group, idx) => {
                        const activeClass = this.state.activeTab === idx ? 'is-active' : '';
                        return <li className={`tabs-title small-2 ${activeClass}`} tabIndex={idx} key={idx}>
                            <a role="tab" href={`#panel2-${idx}`}>{group.name}</a>
                        </li>;
                    })}
                </ul>
                <div className="tabs-content" data-tabs-content="firstRoundTabs">
                    {this.props.groups.items.map((group, idx) => {
                        const activeClass = this.state.activeTab === idx ? 'is-active' : '';
                        return (
                            <section role="tabpanel" className={`tabs-panel ${activeClass}`} id={`panel2-${idx}`}
                                     key={idx}>
                                <MatchesTable
                                    matches={group.matches}
                                    roundName={`Gruppe ${group.name}`}
                                    currentRound={this.props.currentRound}
                                    fields={this.props.fields}
                                    initialValues={this.initialValues}
                                    fieldsReadOnly={this.props.fieldsReadOnly}
                                    joker={this.props.joker}/>
                            </section>
                        );
                    })}

                    {this.props.dirty && this.props.error && <div>Manche Felder sind ungültig</div>}
                    <div className="small-12 columns">
                        <button className="button" disabled={this.props.submitting} onClick={this.props.handleSubmit}>
                            Senden
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

FirstRoundTabs.propTypes = {
    groups: PropTypes.object.isRequired,
    owntips: PropTypes.object.isRequired,
    currentRound: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    fieldsReadOnly: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'tips',
    validate: tipValidation
})(FirstRoundTabs);
