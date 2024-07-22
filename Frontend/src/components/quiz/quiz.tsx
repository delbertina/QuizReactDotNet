import React, { Component } from 'react';
import Card from '../card/card';
import Alerts from '../alerts/alerts';
import Restart from '../restart/restart';

interface Props { }
interface State {
    totalCorrect: number,
    isDone: boolean
}

class Quiz extends Component<Props, State> {
    private childCard: React.RefObject<Card>;
    private childAlerts: React.RefObject<Alerts>;

    constructor(props: Props) {
        super(props);
        this.state = { totalCorrect: 0, isDone: false };
        this.childCard = React.createRef();
        this.childAlerts = React.createRef();
    }

    handleAlertChange(alert: string, totalCorrect: number) {
        this.setState({ totalCorrect: totalCorrect, isDone: alert === 'done' });
        this.childAlerts.current?.handleAlertChange(alert);
    }

    handleStartOver() {
        this.childCard.current?.restartQuiz();
    }

    render() {
        return (
            <div className="main">
                <div className="alert-wrapper">
                    <Alerts
                        totalCorrect={this.state.totalCorrect}
                        ref={this.childAlerts}
                    />
                </div>
                <div className="card-wrapper">
                    <Card
                        onAlertChange={this.handleAlertChange.bind(this)}
                        isDone={this.state.isDone}
                        ref={this.childCard}
                    />
                </div>
                <div className="page-actions">
                    <Restart
                        onStartOver={this.handleStartOver.bind(this)}
                        isDisplayed={this.state.isDone}
                    />
                </div>
            </div>
        );
    }
}
export default Quiz;