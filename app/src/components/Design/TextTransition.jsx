import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class TextTransition extends Component {
    render() {
        return (
            <ReactCSSTransitionGroup
                component="div"
                transitionName="fade"
                transitionEnterTimeout={800}
                transitionLeaveTimeout={500}
            >
                <div key={this.props.key}>
                    {this.props.content}
                </div>

            </ReactCSSTransitionGroup>
        );
    }
}
