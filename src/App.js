import './App.scss';
import {
  Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Admin from './layout/Admin';
import Login from './pages/Login/Login';
import SuperAdmin from './layout/SuperAdmin';

var history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/super-admin" component={SuperAdmin} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;