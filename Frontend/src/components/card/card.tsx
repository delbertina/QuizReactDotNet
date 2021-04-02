import { Component } from 'react';
import './card.scss';

interface Props {
    onAlertChange: Function,
    isDone: boolean
}
interface State {
    totalCorrect: number,
    correctId: number,
    questionNum: number,
    questionText: string,
    possibleAnswers: string[],
    isLoading: boolean
}

class Card extends Component<Props, State>  {

    public constructor(props: Props) {
        super(props);
        this.state = {
            totalCorrect: 0,
            correctId: -1,
            questionNum: 0,
            questionText: '',
            possibleAnswers: ['', '', '', ''],
            isLoading: false,
        };
    }

    public componentDidMount() {
        this.nextQuestion();
    }

    private handleClick(index: number) {
        this.setState({ isLoading: true });
        if (index === this.state.correctId) {
            this.props.onAlertChange('correct');
            this.setState({
                totalCorrect: this.state.totalCorrect + 1,
            });
        } else {
            this.props.onAlertChange('incorrect');
        }
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    private nextQuestion() {
        this.setState({ isLoading: true });
        fetch('http://127.0.0.1:5000/api/QuizQuestion/')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    correctId: data.questioncorrectid,
                    questionNum: this.state.questionNum + 1,
                    questionText: data.questiontext,
                    possibleAnswers: data.questionanswers,
                    isLoading: false
                });
                if (this.state.questionNum > 15) {
                    this.endQuiz();
                }
            }).catch(console.log);
    }

    public endQuiz() {
        this.props.onAlertChange('done', this.state.totalCorrect);
        this.setState({
            totalCorrect: 0,
            questionNum: 0,
        });
    }

    public restartQuiz() {
        this.props.onAlertChange('', this.state.totalCorrect);
        this.nextQuestion();
    }

    public render() {
        return (
            <div className={`card ${this.props.isDone ? "card-done" : ""}`} >
                <div className="card-header">
                    <h3>
                        Question #{this.state.questionNum}
                    </h3>
                    <p>
                        {this.state.totalCorrect} / 15
                    </p>
                </div>
                <div className="card-content">
                    <p>
                        {this.state.questionText}
                    </p>
                </div>
                <div className="card-actions">
                    <button
                        onClick={() => { this.handleClick(0) }}
                        disabled={this.state.isLoading}
                        className={`answer-button 
                        ${this.state.correctId === 0
                                ? "correct-button"
                                : "incorrect-button"}`}
                    >
                        A) {this.state.possibleAnswers[0]}
                    </button>
                    <button
                        onClick={() => { this.handleClick(1) }}
                        disabled={this.state.isLoading}
                        className={`answer-button 
                        ${this.state.correctId === 1
                                ? "correct-button"
                                : "incorrect-button"}`}
                    >
                        B) {this.state.possibleAnswers[1]}
                    </button>
                    <button
                        onClick={() => { this.handleClick(2) }}
                        disabled={this.state.isLoading}
                        className={`answer-button 
                        ${this.state.correctId === 2
                                ? "correct-button"
                                : "incorrect-button"}`}
                    >
                        C) {this.state.possibleAnswers[2]}
                    </button>
                    <button
                        onClick={() => { this.handleClick(3) }}
                        disabled={this.state.isLoading}
                        className={`answer-button 
                        ${this.state.correctId === 3
                                ? "correct-button"
                                : "incorrect-button"}`}
                    >
                        D) {this.state.possibleAnswers[3]}
                    </button>
                </div>
            </div>
        );
    }
}
export default Card;