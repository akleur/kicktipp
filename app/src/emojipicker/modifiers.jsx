import React, { Component } from 'react';
import _ from 'underscore';
import Modifier from './modifier.jsx';

export default class Modifiers extends Component {
    render() {
        const colorList = {
            active: 0,
            modifiers: {
                0: '#FFDE5C',
                1: '#FFE1BB',
                2: '#FFD0A9',
                3: '#D7A579',
                4: '#B57D52',
                5: '#8B6858'
            }
        };
        const list = [];
        const { onChange } = this.props;

        _.each(colorList.modifiers, (hex, index) => {
            list.push(<li key={index}><Modifier hex={hex} active={this.props.active === index} onClick={() => {
                onChange(index);
            }}/></li>);
        });

        return <ol className="modifiers">{list}</ol>;
    }
}
