import React from 'react';
import ReactDOM from 'react-dom';
import CompanyListings from './components/CompanyListings.js'
import JobListings from './components/JobListings.js'
import Login from './components/LoginForm.js'
import RegisterForm from './components/RegisterForm.js'
import NoMatch404 from './components/NoMatch404.js'
import {BrowserRouter, Switch, Route} from 'react-router-dom';

class App extends React.Component {
  render (){
    return <div>
      <Switch>
        <Route path='/companies' component={CompanyListings}/>
        <Route path='/jobs' component={JobListings}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={RegisterForm}/>
      </Switch>
    </div>
  }
}

ReactDOM.render(<BrowserRouter>
  <App/>
</BrowserRouter>, document.getElementById('app-container'));
