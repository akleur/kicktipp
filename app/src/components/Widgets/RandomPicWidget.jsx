import React, { Component, PropTypes } from 'react';

export default class RandomPicWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picUrl: ''
        };
    }

    componentWillMount() {
        const { picPath, picRandomRange } = this.props;
        const random = this.getRandomInt(picRandomRange.min, picRandomRange.max);
        const randomPath = `${picPath}${random}.jpg`;
        this.setState({
            picUrl: randomPath
        });
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    render() {
        const { picUrl } = this.state;

        return (
            <div>
                <img src={picUrl}/>
            </div>
        );
    }
}

RandomPicWidget.propTypes = {
    picPath: PropTypes.string.isRequired,
    picRandomRange: PropTypes.object.isRequired
};
