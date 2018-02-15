import React, { Component, PropTypes } from 'react';

export default class TeamView extends Component {
    render() {
        const { countryCode, name } = this.props;
        const flag = (countryCode) ? `/imgs/flags/${countryCode}.svg` : '/imgs/kicktipp2016.svg';
        const sizeClass = this.props.fullSize ? 'full-size' : '';

        return (
            <div className="team-view">
                {(countryCode)
                    ? <img src={flag} className={`team-img ${sizeClass}`}/>
                    : <img className={sizeClass} src={flag}/>
                }
                <figcaption>
                    <h4 className="hide-for-medium">{countryCode}</h4>
                    <h5 className="show-for-medium">{name}</h5>
                </figcaption>
            </div>
        );
    }
}

TeamView.propTypes = {
    countryCode: PropTypes.string,
    name: PropTypes.string,
    fullSize: PropTypes.string
};
