import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './question-delete.scss';

interface Props {
    match: any;
    history: any;
}
interface State {
    question: Question;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
}
interface Question {
    questionId: number;
    correctId: number;
    questionText: string;
    possibleAnswers: string[];
}
interface IncomingQuestion {
    questionid: number;
    questioncorrectid: number;
    questiontext: string;
    questionanswers: string[];
}

class Question_Delete extends Component<Props, State> {

    public constructor(props: Props) {
        super(props);
        this.state = {
            isError: false,
            errorMessage: "",
            isLoading: true,
            question: {
                questionId: -1, correctId: -1, questionText: '', possibleAnswers: ['', '', '', '']
            }
        };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:5000/api/QuizQuestion/' + this.props.match.params.questionid)
            .then(res => res.json())
            .then((data: IncomingQuestion) => {
                this.setState({
                    isLoading: false,
                    question: {
                        questionId: data.questionid,
                        correctId: data.questioncorrectid,
                        questionText: data.questiontext,
                        possibleAnswers: data.questionanswers,
                    }
                });
            });
    }

    handleDeleteClick() {
        this.setState({ isLoading: true });
        fetch('http://127.0.0.1:5000/api/QuizQuestion/' + this.props.match.params.questionid, { method: 'DELETE' })
            .then(res => res.json())
            .then((data: IncomingQuestion) => {
                this.setState({ isLoading: false });
                this.props.history.push("/question/list");
            });
    }

    render() {
        return (
            <div>
                <h3>Question Delete</h3>
                <div className={"question-delete-error-wrapper " + this.state.isError ? "" : "display-none"}>
                    <h5>{this.state.errorMessage}</h5>
                </div>
                <div className={this.state.isLoading ? "display-none" : ""}>
                    <div className="question-card-wrapper">
                        <div className="question-card">
                            <div className="question-card-content">
                                <p>ID: {this.state.question.questionId}</p>
                                <p>Text: {this.state.question.questionText}</p>
                                <p>Correct ID: {this.state.question.correctId}</p>
                                <div className="answer-list">
                                    <p className="answer-list-item">Answers:</p>
                                    {this.state.question.possibleAnswers.map(answer =>
                                        <p className="answer-list-item">{answer}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <h5>Are you sure you want to delete?</h5>
                    <div className="question-action-list">
                        <Link to={`/question/list`}>
                            <button className="question-action-button">Cancel</button>
                        </Link>
                        <button className="question-action-button" onClick={this.handleDeleteClick.bind(this)}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }

}
export default Question_Delete;