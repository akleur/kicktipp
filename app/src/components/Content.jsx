import React, { Component } from 'react';

export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showClass: 'no'
        };
    }

    componentWillMount() {
        this.setState({
            showClass: 'yes'
        });
    }

    componentWillUnmount() {
        this.setState({
            showClass: 'no'
        });
    }
    render() {
        return (
            <div className={this.state.showClass} key={this.props.path}>{this.props.content}</div>
        );
    }
}
