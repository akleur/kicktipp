import React, { Component, PropTypes } from 'react';

export default class PenaltySurveyResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultsCount: 0,
            resultsCalculated: []
        };
    }

    componentWillMount() {
        this.calculateTotalCountOfResults();
    }

    calculateTotalCountOfResults() {
        const { results } = this.props;
        let resultsCount = 0;
        const resultsCalculated = [];
        results.map((result) => {
            resultsCount += result.count;
        });
        results.map((result, idx) => {
            resultsCalculated[idx] = result;
            resultsCalculated[idx].percent = Math.round((result.count * 100) / resultsCount);
        });
        this.setState({
            resultsCount,
            resultsCalculated
        });
    }

    render() {
        const { resultsCalculated } = this.state;

        return (
            <div>
                {resultsCalculated.map((result, idx) => {
                    const divStyle = {
                        width: `${result.percent}%`
                    };
                    return (
                        <div className="row" key={idx}>
                            <div className="small-12 medium-6 column">
                                {idx === 0
                                    ? 'Ergebnis nach der regulären Spielzeit (also nach 90 min)'
                                    : 'Ergebnis der im Elfmeterschießen erzielten Tore'
                                }
                            </div>
                            <div className="small-12 medium-6 column">
                                <div className="survey-result"
                                     style={divStyle}>{result.count}</div>
                            </div>
                        </div>
                    );
                })
                }
            </div>
        );
    }
}

PenaltySurveyResults.propTypes = {
    results: PropTypes.array.isRequired
};
