import React, { Component, PropTypes } from 'react';
import TeamView from '../Teams/TeamView.jsx';

export default class EMTipView extends Component {
    render() {
        const { ownEMTip } = this.props;
        return (
            <div>
                <h1 className="align-center">EM-Tipp</h1>
                <div>
                    <h3>Dein Tipp:</h3>
                    {ownEMTip.name && ownEMTip.countryCode &&
                    <TeamView name={ownEMTip.name} countryCode={ownEMTip.countryCode} fullSize="true"/>
                    }
                </div>
            </div>
        );
    }
}

EMTipView.propTypes = {
    ownEMTip: PropTypes.object.isRequired
};
