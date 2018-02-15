import React, { Component } from 'react';

export default class CssSpinner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    componentDidMount() {
        setTimeout(this.setState({ show: true }), 1000);
    }

    render() {
        return (
            <div>
                {this.state.show
                    ? <div className="css-spinner">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
                    : false
                }
            </div>
        );
    }
}
