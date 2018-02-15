import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class TwitterWidget extends Component {
    constructor(props) {
        super(props);
        this.state = ({ initialized: false });
    }

    componentDidMount() {
        if (this.state.initialized) {
            return;
        }

        if (typeof twttr === 'undefined') {
            const twittertimeline = ReactDOM.findDOMNode(this.refs.twittertimeline);
            const twitterscript = document.createElement('script');
            twitterscript.src = '//platform.twitter.com/widgets.js';
            twitterscript.async = true;
            twitterscript.id = 'twitter-wjs';
            twittertimeline.parentNode.appendChild(twitterscript);
        } else {
            twttr.widgets.load();
        }

        this.initialized();
    }

    initialized() {
        this.setState({ initialized: true });
    }

    render() {
        return (
            <a
                ref="twittertimeline"
                className="twitter-timeline"
                href="https://twitter.com/hashtag/EURO2016"
                data-widget-id={this.props.widgetId}>
                #EURO2016-Tweets
            </a>
        );
    }
}
