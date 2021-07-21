import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';

const Middleware = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => <App /> }/>
            </Switch>
        </Router>
    )
}

export default Middleware;