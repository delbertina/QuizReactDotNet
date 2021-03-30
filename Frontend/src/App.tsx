import './App.scss';
import React, { Component } from 'react';
import Card from './components/card/card';
import Alerts from './components/alerts/alerts';
import Header from './components/header/header';

interface Props { }
interface State {
  totalCorrect: number;
}

class App extends Component<Props, State> {

  private childCard: React.RefObject<Card>;
  private childAlerts: React.RefObject<Alerts>;

  constructor(props: Props) {
    super(props);
    this.state = { totalCorrect: 0 };
    this.childCard = React.createRef();
    this.childAlerts = React.createRef();
  }

  handleAlertChange(alert: string, totalCorrect: number) {
    this.setState({ totalCorrect: totalCorrect });
    this.childAlerts.current?.handleAlertChange(alert);
  }

  handleStartOver() {
    this.childCard.current?.restartQuiz();
  }

  render() {
    return (
      <div>
        <Header />
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
              ref={this.childCard}
            />
          </div>
          <div className="page-actions">
            <button
              className="start-over-button"
              onClick={() => { this.handleStartOver() }}>
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default App;