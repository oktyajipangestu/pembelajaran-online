import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';
import ListVideo from './components/ListVideo';
import Login from './components/Login';

const Middleware = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => <App /> }/>
                <Route exact path="/login-admin" render={() => <Login />} />
                <Route exact path="/list-video-admin" render={() => <ListVideo />} />
            </Switch>
        </Router>
    )
}

export default Middleware;