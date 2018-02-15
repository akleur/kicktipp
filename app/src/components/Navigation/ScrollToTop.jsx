import React, { Component } from 'react';

export default class ScrollToTop extends Component {
    scroll() {
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    }

    render() {
        return (
            <button className="success button btn-scroll-to-top" onClick={this.scroll.bind(this)}>
                <i className="fi-arrow-up large"></i>
            </button>
        );
    }
}
