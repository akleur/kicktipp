import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoWidget from '../components/Widgets/VideoWidget.jsx';

class ViewMediaContainer extends Component {
    render() {
        return (
            <div>
                <h1>Videos</h1>
                <VideoWidget/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { auth } = state;

    return {
        auth
    };
}

export default connect(mapStateToProps)(ViewMediaContainer);
