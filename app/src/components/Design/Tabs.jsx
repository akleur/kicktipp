import React, { Component } from 'react';

export default class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(idx) {
        this.setState({ activeTab: idx });
        return false;
    }

    render() {
        return (
            <div>
                <ul className="tabs">
                    {this.props.data.map((tab, idx) => {
                        const activeClass = this.state.activeTab === idx ? 'is-active' : '';
                        return (
                            <li className={`tabs-title small-${tab.title.width} ${activeClass}`} key={idx}>
                                <a href="#" onClick={this.handleClick.bind(this, idx)}>{tab.title.name}</a>
                            </li>
                        );
                    }, this)}
                </ul>
                <div className="tabs-content">
                    {this.props.data.map((tab, idx) => {
                        const activeClass = this.state.activeTab === idx ? 'is-active' : '';
                        return (
                            <section role="tabpanel" className={`tabs-panel ${activeClass}`} key={idx}>
                                {tab.content}
                            </section>
                        );
                    }, this)}
                </div>
            </div>
        );
    }
}
