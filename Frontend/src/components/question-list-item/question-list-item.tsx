import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './question-list-item.scss';

interface Props {
    questionId: number;
    correctId: number;
    questionText: string;
    possibleAnswers: string[];
}
interface State { }

class QuestionListItem extends Component<Props, State> {
    render() {
        return (
            <div className="answer-card-wrapper">
                <div className="answer-card">
                    <div className="answer-card-content">
                        <p>ID: {this.props.questionId}</p>
                        <p>Text: {this.props.questionText}</p>
                        <p>Correct ID: {this.props.correctId}</p>
                        <div className="answer-list">
                            <p className="answer-list-item">Answers:</p>
                            {this.props.possibleAnswers.map((answer, index) =>
                                <p key={index} className="answer-list-item">{answer}</p>
                            )}
                        </div>
                    </div>
                    <div className="answer-card-actions">
                        <Link to={'/question/edit/' + this.props.questionId}>
                            <button className="answer-card-action-button">
                                Edit
                    </button>
                        </Link>
                        <Link to={'/question/delete/' + this.props.questionId}>
                            <button className="answer-card-action-button">
                                Delete
                    </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default QuestionListItem;