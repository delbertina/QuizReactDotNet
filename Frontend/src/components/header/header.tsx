import { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

class Header extends Component {
    public render() {
        return (
            <div className="header">
                <h2>
                    Web Quiz
                </h2>
                <div className="nav-button-list">
                    <Link to={'/'}>
                        <button className="nav-button nav-quiz">
                            Quiz
                        </button>
                    </Link>
                    <Link to={'/question/list'}>
                        <button className="nav-button nav-questions">
                            Questions
                        </button>
                    </Link>
                    <Link to={'/'}>
                        <button className="nav-button nav-highscores">
                            Highscores
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}
export default Header;