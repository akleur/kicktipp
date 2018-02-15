import React, { Component, PropTypes } from 'react';

export default class TeamViewSmall extends Component {
    render() {
        const { countryCode, name } = this.props;
        const flag = (countryCode) ? `/imgs/flags/${countryCode}.svg` : '/imgs/kicktipp2016.svg';
        return (
            <div className="team-view row">
                <div className="team-flag-small column small-6 medium-4">
                    {(countryCode)
                        ? <img src={flag} className="team-img-small"/>
                        : <img src={flag}/>
                    }
                </div>
                <figcaption className="team-name-small column small-6 medium-8">
                    <h5 className="hide-for-medium">{countryCode}</h5>
                    <h5 className="show-for-medium">{name}</h5>
                </figcaption>
            </div>
        );
    }
}

TeamViewSmall.propTypes = {
    countryCode: PropTypes.string,
    name: PropTypes.string.isRequired
};
