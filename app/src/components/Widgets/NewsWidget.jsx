import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NewsItem from './NewsItem.jsx';

export default class NewsWidget extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            newsList: []
        });
    }

    receivedNews(data) {
        if (data.query.results.item) {
            this.setState({
                newsList: data.query.results.item
            });
        }
    }

    componentDidMount() {
        const newswidget = ReactDOM.findDOMNode(this.refs.newswidget);

        window.yqlCallback = (data) => {
            if (this.receivedNews && typeof this.receivedNews === 'function') {
                this.receivedNews(data);
            }
        };

        const newsscript = document.createElement('script');
        newsscript.src = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fde.uefa.com%2Frssfeed%2Fuefaeuro%2Frss.xml%22&format=json&callback=yqlCallback';
        newsscript.id = 'news-widjet-js';
        newswidget.parentNode.appendChild(newsscript);
    }

    render() {
        return (
            <div ref="newswidget" className="phone-padding">
                {this.state.newsList.length
                    ? this.state.newsList.map((news, idx) => {
                        return (
                            <NewsItem
                                key={idx}
                                title={news.title}
                                description={news.description}
                                link={news.link}
                                pubDate={news.pubDate}
                                enclosure={news.enclosure}/>
                        );
                    })
                    : <div className="css-spinner">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
                }
            </div>
        );
    }
}
