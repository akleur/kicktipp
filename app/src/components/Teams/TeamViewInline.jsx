import React, { Component, PropTypes } from 'react';

export default class TeamViewInline extends Component {
    render() {
        const { countryCode, name } = this.props;
        const flag = (countryCode) ? `/imgs/flags/${countryCode}.svg` : '/imgs/kicktipp2016.svg';

        return (
            <div className="team-view-inline">
                <div className="team-flag-small column small-12 large-4">
                    <img className="team-img-small" src={flag}/>
                </div>
                <span className="hide-for-medium column small-6 end">{countryCode}</span>
                <span className="show-for-medium column large-8 end">{name}</span>
            </div>
        );
    }
}

TeamViewInline.propTypes = {
    countryCode: PropTypes.string,
    name: PropTypes.string.isRequired
};
