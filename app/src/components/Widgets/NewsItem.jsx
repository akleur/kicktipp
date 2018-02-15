import React, { Component, PropTypes } from 'react';

export default class NewsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: null
        };
    }

    componentWillMount() {
        if (this.props.enclosure && this.props.enclosure.type && this.props.enclosure.type === 'image/jpeg') {
            this.setState({ imgUrl: this.props.enclosure.url });
        }
    }

    createMarkup() {
        const { description } = this.props;
        return { __html: description };
    }

    render() {
        const { title, link } = this.props;

        return (
            <div className="callout news-item clearfix">
                <h5>{title}</h5>
                <div className="clearfix">
                    {this.state.imgUrl && <div className="thumbnail float-left"><img src={this.state.imgUrl}/></div>}
                    <div dangerouslySetInnerHTML={this.createMarkup()}></div>
                </div>
                <div className="news-meta">
                    <a href={link} target="_blank">Link zur Nachricht</a>
                </div>
            </div>
        );
    }
}

NewsItem.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    pubDate: PropTypes.string.isRequired
};
