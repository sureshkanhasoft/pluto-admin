import './App.scss';
import {
  Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Admin from './layout/Admin';
import SuperAdmin from './layout/SuperAdmin';
import Login from './pages/Auth/Login/Login';
import ForgottenPassword from './pages/Auth/ForgottenPassword/ForgottenPassword';
import history from './utils/HistoryUtils';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgotten-password" component={ForgottenPassword} />
        <Route path="/admin" component={Admin} />
        <Route path="/super-admin" component={SuperAdmin} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;