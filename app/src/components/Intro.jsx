import React, { Component } from 'react';

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="phone-padding">
                    <div className="callout secondary kick-intro row">
                        <div className="medium-8 small-12 column">
                            <code>
                                <strong>Logbucheintrag Nr. 2016-06-24_16:11</strong><br/><br/>Die nächste Runde kann los
                                gehen...<br/>
                                Denkt dran, ihr habt einen Joker!
                                <br/><br/>
                                Eure Kicktipp-Elf
                            </code>
                        </div>
                        <p className="medium-3 small-12 column">
                            <img src="/imgs/kicktipp2016.svg" width="100%"/>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
