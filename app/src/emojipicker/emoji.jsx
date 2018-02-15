import React, { Component } from 'react';
import emojione from 'emojione';

export default class Emoji extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.shortname !== this.props.shortname;
    }

    createMarkup() {
        return { __html: emojione.shortnameToImage(this.props.shortname) };
    }

    render() {
        return (
            <div {...this.props} onClick={this.props.onClick} tabIndex="0" className="emoji"
                    title={this.props.name}
                    dangerouslySetInnerHTML={this.createMarkup()}>
            </div>
        );
    }
}
