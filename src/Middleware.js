import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';
import Login from './components/Login';

const Middleware = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => <App /> }/>
                <Route exact path="/login-admin" render={() => <Login />} />
            </Switch>
        </Router>
    )
}

export default Middleware;