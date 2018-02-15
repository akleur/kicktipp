import React, { Component, PropTypes } from 'react';

export default class BigSpinner extends Component {
    /*
    componentDidUpdate() {
        const spinner = $('.hide-loading')[0];
        if(spinner) {
          spinner.addEventListener( 'webkitAnimationEnd', () => {this.onTransitionEnd(spinner)}, false );
          spinner.addEventListener( 'animationend', () => {this.onTransitionEnd(spinner)}, false );
          spinner.addEventListener( 'OAnimationEnd', () => {this.onTransitionEnd(spinner)}, false );
        }
    }

    onTransitionEnd(spinner) {
        //spinner.style.display = 'none';
    } */

    render() {
        return (
            <div id="big-spinner" className={`big-spinner ${this.props.showClass}`}>
                <h3>{this.props.content}</h3>
                <img src="imgs/kicktipp2016.svg" width="300" height="300"/>
            </div>
        );
    }
}

BigSpinner.propTypes = {
    content: PropTypes.string,
    showClass: PropTypes.string
};
