import React, { Component, PropTypes } from 'react';

export default class BigSpinner extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoading) {
            $('#big-spinner').removeClass('remove-loading');
        }
    }

    componentDidUpdate() {
        const spinner = $('#big-spinner')[0];
        if (spinner) {
            spinner.addEventListener('webkitAnimationEnd', () => {
                this.onAnimationEnd(spinner);
            }, false);
            spinner.addEventListener('animationend', () => {
                this.onAnimationEnd(spinner);
            }, false);
            spinner.addEventListener('OAnimationEnd', () => {
                this.onAnimationEnd(spinner);
            }, false);
        }
    }

    onAnimationEnd() {
        $('#big-spinner').addClass('remove-loading');
    }

    render() {
        return (
            <div id="big-spinner" className={`big-spinner ${this.props.showClass}`}>
                <div className="big-spinner-inner">
                    <div className="big-spinner-text">{this.props.content}</div>
                    <img src="imgs/kicktipp2016.svg" width="300" height="300"/>
                </div>
            </div>
        );
    }
}

BigSpinner.propTypes = {
    content: PropTypes.string,
    showClass: PropTypes.string,
    isLoading: PropTypes.bool
};
