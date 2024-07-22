import React, { Component } from 'react';
import './alerts.scss';

interface Props {
    totalCorrect: number,
    isDisplayCorrect?: boolean,
    isDisplayIncorrect?: boolean,
    isDisplayDone?: boolean
}
interface State {
    isDisplayCorrect: boolean,
    isDisplayIncorrect: boolean,
    isDisplayDone: boolean
}

function CorrectAlert() {
    return <div className="correct-alert alert">
        <h3>Correct!</h3>
    </div>;
}
function IncorrectAlert() {
    return <div className="incorrect-alert alert">
        <h3>Incorrect!</h3>
    </div>;
}

class DoneAlert extends Component<Props, State> {
    public render() {
        return <div className="done-alert alert">
            <h3>Results: {((this.props.totalCorrect / 15) * 100).toFixed(1)}% {this.props.totalCorrect}/15</h3>
        </div>;
    }
}

class DisplayAlert extends Component<Props, State> {

    public render() {
        return (
            <div>
                {this.props.isDisplayCorrect ? (<CorrectAlert />) : null}
                {this.props.isDisplayIncorrect ? (<IncorrectAlert />) : null}
                {this.props.isDisplayDone ? (<DoneAlert totalCorrect={this.props.totalCorrect} />) : null}
            </div>
        )
    }
}

class Alerts extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isDisplayCorrect: false,
            isDisplayIncorrect: false,
            isDisplayDone: false
        }
    }

    public handleAlertChange(newAlert: string) {
        switch (newAlert) {
            case 'correct': {
                this.setState({ isDisplayCorrect: true });
                setTimeout(() => {
                    this.setState({ isDisplayCorrect: false });
                }, 1500);
                break;
            }
            case 'incorrect': {
                this.setState({ isDisplayIncorrect: true });
                setTimeout(() => {
                    this.setState({ isDisplayIncorrect: false });
                }, 1500);
                break;
            }
            case 'done': {
                this.setState({ isDisplayDone: true });
                break;
            }
            default: {
                this.setState({ isDisplayCorrect: false, isDisplayDone: false, isDisplayIncorrect: false });
                break;
            }
        }
    }

    public render() {
        return (
            <div className="alert-list">
                <DisplayAlert
                    isDisplayCorrect={this.state.isDisplayCorrect}
                    isDisplayIncorrect={this.state.isDisplayIncorrect}
                    isDisplayDone={this.state.isDisplayDone}
                    totalCorrect={this.props.totalCorrect}
                />
            </div>
        );
    }
}
export default Alerts;