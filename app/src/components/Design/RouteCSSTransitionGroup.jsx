import React, { Component } from 'react';
import StaticContainer from 'react-static-container';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class RouteCSSTransitionGroup extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            previousPathname: null
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextContext.location.pathname !== this.context.location.pathname) {
            this.setState({ previousPathname: this.context.location.pathname });
        }
    }

    render() {
        const { children, ...props } = this.props;
        const { previousPathname } = this.state;
        return (
            <ReactCSSTransitionGroup {...props}>
                <StaticContainer
                    key={previousPathname || this.context.location.pathname}
                    shouldUpdate={!previousPathname}
                >
                    {children}
                </StaticContainer>
            </ReactCSSTransitionGroup>
        );
    }

    componentDidUpdate() {
        if (this.state.previousPathname) {
            this.setState({ previousPathname: null });
        }
    }
}

RouteCSSTransitionGroup.contextTypes = {
    location: React.PropTypes.object
};
