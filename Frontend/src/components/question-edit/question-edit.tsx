import React, { Component, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import './question-edit.scss';

interface Props {
    match: any;
    history: any;
}
interface State {
    originalQuestion: IncomingQuestion;
    questionid: number;
    questioncorrectid: number;
    questiontext: string;
    questionanswer1: string;
    questionanswer2: string;
    questionanswer3: string;
    questionanswer4: string;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
}
interface IncomingQuestion {
    questionid: number;
    questioncorrectid: number;
    questiontext: string;
    questionanswers: string[];
}

class Question_Edit extends Component<Props, State> {

    public constructor(props: Props) {
        super(props);
        this.state = {
            isError: false,
            errorMessage: "",
            isLoading: true,
            questionid: -1,
            questioncorrectid: -1,
            questiontext: '',
            questionanswer1: '',
            questionanswer2: '',
            questionanswer3: '',
            questionanswer4: '',
            originalQuestion: {
                questionid: -1, questioncorrectid: -1, questiontext: '', questionanswers: ['', '', '', '']
            }
        };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:5000/api/QuizQuestion/' + this.props.match.params.questionid)
            .then(res => res.json())
            .then((data: IncomingQuestion) => {
                this.setState({
                    isLoading: false,
                    originalQuestion: {
                        questionid: data.questionid,
                        questioncorrectid: data.questioncorrectid,
                        questiontext: data.questiontext,
                        questionanswers: data.questionanswers,
                    },
                    questionid: data.questionid,
                    questioncorrectid: data.questioncorrectid,
                    questiontext: data.questiontext,
                    questionanswer1: data.questionanswers[0],
                    questionanswer2: data.questionanswers[1],
                    questionanswer3: data.questionanswers[2],
                    questionanswer4: data.questionanswers[3]
                });
            });
    }
    handleEditClick() {
        this.setState({ isLoading: true, isError: false });
        if (!this.isFormValid()) {
            this.setState({ isError: true });
            return;
        }
        fetch('http://127.0.0.1:5000/api/QuizQuestion/' + this.props.match.params.questionid, {
            method: 'POST', body: JSON.stringify({
                questionid: this.state.questionid,
                questioncorrectid: this.state.questioncorrectid,
                questiontext: this.state.questiontext,
                questionanswers: [
                    this.state.questionanswer1,
                    this.state.questionanswer2,
                    this.state.questionanswer3,
                    this.state.questionanswer4
                ]
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((data: IncomingQuestion) => {
                this.setState({ isLoading: false });
                this.props.history.push("/question/list");
            });
    }

    isFormValid() {
        this.setState({ errorMessage: '' });
        if (isNaN(this.state.questioncorrectid)) {
            this.setState({ errorMessage: 'Correct ID is invalid!' });
            return false;
        } else if (this.state.questioncorrectid < 0 || this.state.questioncorrectid > 3) {
            this.setState({ errorMessage: "Correct ID is out of range!" });
            return false;
        } else if ((typeof this.state.questiontext) !== 'string') {
            this.setState({ errorMessage: 'Question text is invalid!' });
            return false;
        } else if (this.state.questiontext.length < 16) {
            this.setState({ errorMessage: 'Question text is too short' });
            return false;
        } else if ((typeof this.state.questionanswer1) !== 'string' || this.state.questionanswer1.length < 1) {
            this.setState({ errorMessage: 'Answer #1 is invalid!' });
            return false;
        } else if ((typeof this.state.questionanswer2) !== 'string' || this.state.questionanswer2.length < 1) {
            this.setState({ errorMessage: 'Answer #2 is invalid!' });
            return false;
        } else if ((typeof this.state.questionanswer3) !== 'string' || this.state.questionanswer3.length < 1) {
            this.setState({ errorMessage: 'Answer #3 is invalid!' });
            return false;
        } else if ((typeof this.state.questionanswer4) !== 'string' || this.state.questionanswer4.length < 1) {
            this.setState({ errorMessage: 'Answer #4 is invalid!' });
            return false;
        }
        return true;
    }

    handelFormChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        console.log(event);
        switch (event.target.name) {
            case "questiontext":
                this.setState({ questiontext: event.target.value });
                break;
            case "questioncorrectid":
                this.setState({ questioncorrectid: parseInt(event.target.value) });
                break;
            case "questionanswer1":
                this.setState({ questionanswer1: event.target.value });
                break;
            case "questionanswer2":
                this.setState({ questionanswer2: event.target.value });
                break;
            case "questionanswer3":
                this.setState({ questionanswer3: event.target.value });
                break;
            case "questionanswer4":
                this.setState({ questionanswer4: event.target.value });
                break;
        }
    }

    render() {
        return (
            <div>
                <h3>Question Edit</h3>
                <div className={"question-delete-error-wrapper " + this.state.isError ? "" : "display-none"}>
                    <h5>{this.state.errorMessage}</h5>
                </div>
                <div className={this.state.isLoading ? "display-none" : ""}>
                    <div className="question-card-wrapper">
                        <div className="question-card">
                            <div className="question-card-content">
                                <div className="question-card-field">
                                    <p>ID: {this.state.originalQuestion.questionid}</p>
                                </div>
                                <div className="question-card-field">
                                    <p>Text: {"\"" + this.state.originalQuestion.questiontext + "\""}</p>
                                    <input
                                        type="text"
                                        name="questiontext"
                                        value={this.state.questiontext}
                                        onChange={this.handelFormChange.bind(this)}
                                    ></input>
                                </div>
                                <div className="question-card-field">
                                    <p>Correct ID: {this.state.originalQuestion.questioncorrectid}</p>
                                    <input
                                        type="number" max="3" min="0"
                                        name="questioncorrectid"
                                        value={this.state.questioncorrectid}
                                        onChange={this.handelFormChange.bind(this)}
                                    ></input>
                                </div>
                                <div className="answer-list">
                                    {this.state.originalQuestion.questionanswers.map((answer, index) =>
                                        <div key={index} className="question-card-field">
                                            <p className="answer-list-item">{"Answer #" + (index + 1) + " - \"" + answer + "\""}</p>
                                            <input
                                                type="text"
                                                name={"questionanswer" + (index + 1)}
                                                value={(this.state["questionanswer" + (index + 1) as keyof State]).toString()}
                                                onChange={this.handelFormChange.bind(this)}
                                            ></input>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <h5>Submit edits?</h5>
                    <h5 className={"error-message" + this.state.isError ? "" : "display-none"}>
                        {this.state.errorMessage}
                    </h5>
                    <div className="question-action-list">
                        <Link to={`/question/list`}>
                            <button className="question-action-button">Cancel</button>
                        </Link>
                        <button className="question-action-button" onClick={this.handleEditClick.bind(this)}>Edit</button>
                    </div>
                </div>
            </div>
        )
    }

}
export default Question_Edit;