import React, { Component } from 'react';

export default class Modifier extends Component {
    render() {
        return <a {...this.props} onClick={this.props.onClick} className={this.props.active ? 'modifier active' : 'modifier'} style={{ background: this.props.hex }}></a>;
    }
}
