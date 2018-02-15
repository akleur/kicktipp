import React, { Component, PropTypes } from 'react';
import ReduxToastr, { toastr } from 'react-redux-toastr';

export default class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {
                timestamp: new Date().getTime()
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        const toastrOptions = {
            timeOut: 3500
        };
        if (nextProps.message.msg && nextProps.message.msg !== '' && nextProps.message.timestamp > this.state.message.timestamp) {
            this.setState({
                message: {
                    timestamp: nextProps.message.timestamp
                }
            });
            if (nextProps.message.error) {
                toastr.error(nextProps.message.msg, toastrOptions);
            } else {
                toastr.info(nextProps.message.msg, toastrOptions);
            }
        }
    }

    render() {
        return (
            <div>
                <ReduxToastr newestOnTop={false} position="bottom-right"/>
            </div>
        );
    }
}

MessageBox.propTypes = {
    message: PropTypes.object.isRequired
};
