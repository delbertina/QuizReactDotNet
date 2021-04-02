import './App.scss';
import { Component } from 'react';
import Header from './components/header/header';
import Quiz from './components/quiz/quiz';
import Question_List from './components/question-list/question-list';
import Question_Delete from './components/question-delete/question-delete';
import Question_Edit from './components/question-edit/question-edit';
import Question_New from './components/question-new/question-new';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

interface Props { }
interface State { }

class App extends Component<Props, State> {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path={`/`} component={Quiz} />
            <Route exact path={`/question/list`} component={Question_List} />
            <Route exact path={`/question/new`} component={Question_New} />
            <Route exact path={`/question/delete/:questionid`} component={Question_Delete} />
            <Route exact path={`/question/edit/:questionid`} component={Question_Edit} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;