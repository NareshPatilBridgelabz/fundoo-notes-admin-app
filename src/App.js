import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import Registration from './components/registration'
import Login from './components/login'
import Dashboard from './components/dashboard'
import ForgotPassword from './components/forgotPassword'
import FundooServices from './components/fundooSevices'

function App() {
  return (
    <Router>
        <Switch>
          <Route path='/registration' component={Registration} />
          <Route path='/login' component={Login} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/forgotpassword' component={ForgotPassword} />
          <Route path="/" component={FundooServices} />
        </Switch>
      </Router>
  );
}

export default App;
