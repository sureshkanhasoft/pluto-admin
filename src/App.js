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
import ResetPassword from './pages/Auth/ForgottenPassword/ResetPassword';
import history from './utils/HistoryUtils';
import PrivateRoute from './config/PrivateRoute';
import { useEffect } from 'react';
import StaffUser from './layout/StaffUser';


function App() {
  // let url_string = window.location.href;
  // let url = new URL(url_string);
  // console.log('url: ', url.pathname);
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        return true;
      }
      else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    const getRole = localStorage.getItem('role') ? localStorage.getItem('role').replace(/['"]+/g, '') : "";
    if (loggedInUser && getRole==='SUPERADMIN') {
      history.push('/super-admin/dashboard')
    } else if(loggedInUser && getRole==='ORGANIZATION'){
      history.push('/admin/bookings')
    } else if(loggedInUser && getRole==='STAFF'){
      history.push('/staff/bookings')
    } else {
      history.push('/login')
    }
  }, []);

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgotten-password" component={ForgottenPassword} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <PrivateRoute path="/staff" component={StaffUser} isAuthenticated={e => isAuthenticated()} />
        <PrivateRoute path="/admin" component={Admin}  isAuthenticated={e => isAuthenticated()}/>
        <PrivateRoute path="/super-admin" component={SuperAdmin} isAuthenticated={e => isAuthenticated()} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;