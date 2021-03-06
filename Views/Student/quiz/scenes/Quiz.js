import React, {Component}  from 'react';
import {withGlobalContext} from "../contexts/GlobalContext";
import QuizStatus          from "../components/QuizStatus";
import QuestionSelector    from "../components/QuestionSelector";
import Question            from "../components/Question";

class Quiz extends Component {

    onChangeQuestion = (index) => {
        const {reduce} = this.props.globalContext;
        reduce({selectedQuestion: index});
    };

    render() {

        const {quiz, selectedQuestion, group, user, responses} = this.props.globalContext.data;

        return (
            <div>
                <QuizStatus/>
                <div>
                    <QuestionSelector
                        questions={quiz.quiz.questions}
                        selectedIndex={selectedQuestion}
                        responses={responses || []}
                        onSelectionChange={this.onChangeQuestion}
                    />
                    {quiz.quiz.questions.map((question, key) => {
                        return (
                            <Question
                                visible={key === selectedQuestion}
                                question={question}
                                key={question._id}
                                isDriver={group && group.driver === user._id}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default withGlobalContext(Quiz);