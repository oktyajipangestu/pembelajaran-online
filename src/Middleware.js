import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListVideo from './components/ListVideo';
import Login from './components/Login';
import ListUsers from './components/ListUsers';
import LoginUser from './components/AuthUser/LoginUser';
import RegistrasiUser from './components/AuthUser/Registrasi';
import PageListVideoUser from './components/PageListVideoUser';
import SoalQuiz from './components/SoalQuiz';
import Skor from './components/Skor/Skor';

const Middleware = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => <LoginUser /> }/>
                <Route exact path="/login-admin" render={() => <Login />} />
                <Route exact path="/list-video-admin" render={() => <ListVideo />} />
                <Route exact path="/list-users" render={() => <ListUsers />} />
                <Route exact path="/registrasi-user" render={() => <RegistrasiUser />} />
                <Route exact path="/list-video-user" render={() => <PageListVideoUser />} />
                <Route exact path="/quiz" render={() => <SoalQuiz />} />
                <Route exact path="/skor" render={() => <Skor />} />
            </Switch>
        </Router>
    )
}

export default Middleware;