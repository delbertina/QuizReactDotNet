import React, { Component } from 'react';
import QuestionListItem from '../question-list-item/question-list-item';

interface Props { }
interface State {
    questions: Question[]
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

class Question_List extends Component<Props, State> {

    public constructor(props: Props) {
        super(props);
        this.state = { questions: [] };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:5000/api/QuizQuestion/all')
            .then(res => res.json())
            .then((data: IncomingQuestion[]) => {
                let questionList: Question[] = [];
                data.forEach(element => {
                    questionList.push({
                        questionId: element.questionid,
                        correctId: element.questioncorrectid,
                        questionText: element.questiontext,
                        possibleAnswers: element.questionanswers,
                    });
                });
                this.setState({ questions: questionList });
            });
    }

    render() {
        return (
            <div>
                <h3>Question List</h3>
                <div className="question-list">
                    {
                        this.state.questions.map((question, index) =>
                            <QuestionListItem
                                key={index}
                                questionId={question.questionId}
                                questionText={question.questionText}
                                correctId={question.correctId}
                                possibleAnswers={question.possibleAnswers}>
                            </QuestionListItem>
                        )}
                </div>
            </div>
        )
    }
}
export default Question_List;