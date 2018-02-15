import React, { Component } from 'react';

export default class VideoWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoList: [
                {
                    title: 'EM 1960 in Frankreich',
                    link: 'https://www.youtube.com/embed/7f2Civ6K1Pk'
                },
                {
                    title: 'EM 1964 in Spanien',
                    link: 'https://www.youtube.com/embed/b0rLgR1obuQ'
                },
                {
                    title: 'EM 1968 in Italien',
                    link: 'https://www.youtube.com/embed/eXXQVJsZOlg'
                },
                {
                    title: 'EM 1972 in Belgien',
                    link: 'https://www.youtube.com/embed/vjeGqXnu4E8'
                },
                {
                    title: 'EM 1976 in Jugoslawien',
                    link: 'https://www.youtube.com/embed/LMQPYd6ZhVM'
                },
                {
                    title: 'EM 1980 in Italien',
                    link: 'https://www.youtube.com/embed/rpkV-YMQTuk'
                },
                {
                    title: 'EM 1984 in Frankreich',
                    link: 'https://www.youtube.com/embed/Pwo6RqJqUiU'
                },
                {
                    title: 'EM 1988 in Deutschland',
                    link: 'https://www.youtube.com/embed/D0U3pT-icnk'
                },
                {
                    title: 'EM 1992 in Schweden',
                    link: 'https://www.youtube.com/embed/_foryfWWWxo'
                },
                {
                    title: 'EM 1996 in England',
                    link: 'https://www.youtube.com/embed/iIEZX0iHhsk'
                },
                {
                    title: 'EM 2000 in Belgien & Niederlande',
                    link: 'https://www.youtube.com/embed/vdvHQuQ9_-w'
                },
                {
                    title: 'EM 2004 in Portugal',
                    link: 'https://www.youtube.com/embed/OVU6XYJPLw8'
                },
                {
                    title: 'EM 2008 in Österreich & Schweiz',
                    link: 'https://www.youtube.com/embed/VBRUHAyUmjc'
                },
                {
                    title: 'EM 2012 in Polen & Ukraine',
                    link: 'https://www.youtube.com/embed/I6PgcAaMD-4'
                }
            ],
            selectedVideo: 2
        };
    }

    componentWillMount() {
        const { videoList } = this.state;
        const random = this.getRandomInt(0, videoList.length - 1);
        this.setState({
            selectedVideo: random
        });
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    handleChange(event) {
        this.setState({
            selectedVideo: parseInt(event.target.value, 10)
        });
    }

    render() {
        const { videoList, selectedVideo } = this.state;

        return (
            <div className="row">
                <div className="column small-12 medium-8 large-6 small-centered">
                    <select onChange={this.handleChange.bind(this)} value={selectedVideo}>
                        {videoList.map((video, idx) => <option value={idx} key={idx}>{video.title}</option>)}
                    </select>
                    <div className="embed-container">
                        <iframe width="100%" src={videoList[selectedVideo].link} frameBorder="0"
                                allowFullScreen></iframe>
                    </div>
                </div>
            </div>
        );
    }
}
