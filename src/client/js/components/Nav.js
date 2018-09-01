import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import request from 'superagent'
const NotificationSystem = require('react-notification-system');

export default class Nav extends React.Component {
  _navLinkJsx (rObj, i) {
    return <NavLink
      activeClassName="nav__link--selected"
      className="nav__link nav__link-register"
      to={rObj.destination}
      key={i+rObj.destination}
      >
      {rObj.routeText}
    </NavLink>
  }


  _renderDashboardLink(){
    return   <NavLink
        activeClassName="nav__link--selected"
        className="nav__link"
        to={`/dashboard`}
        key={'dashboardnav'}
        >
          Dashboard
      </NavLink>
  }

  _renderLogoutLink(){
    const userName = this.props.appState.currentUser.email
    return   <span
        className="nav__link nav__link-logout"
        key={'logoutnav'}
        onClick = { ()=>{ this._handleLogout(userName) } }
        >
          Logout
      </span>
  }

  _handleLogout(useremail){
      const component = this
      console.log(component);
      request.post('/auth/logout')
        .then((x)=>{
          component.refs.notificationSystem.addNotification({
            title: 'Logged Out',
            message: `${useremail} is logged out`,
            level: 'info'
          })

          component.props.setAppState({
            currentUser : {}
          })


          component.props.history.push('/login')
        })
  }

  render(){
    const appState = this.props.appState
    const defaultRoutesList =  [
      {routeText: 'Jobs' , destination: '/jobs' },
      {routeText: 'Companies' , destination: '/companies' }
    ]

    return   <div className="navbar">
        <div>
          <a className="nav__link nav__link-home" href="/">
            &lt;
            <span style={{fontSize: '1rem', fontFamily: 'sans-serif', display: 'inline-block', verticalAlign: 'middle', margin: '.25rem'}}>HOME</span>
            &gt;
          </a>
        </div>
        <div>
          {defaultRoutesList.map(this._navLinkJsx)}

          {
            typeof appState.currentUser.email === 'undefined' ?
              this._navLinkJsx({routeText: 'Sign Up', destination: '/register'}) :
              ''
          }

          {
            typeof appState.currentUser.email === 'undefined' ?
              this._navLinkJsx({routeText: 'Log In', destination: '/login'}) :
              ''
          }

          {
            typeof appState.currentUser.email !== 'undefined' ?
              this._renderDashboardLink() : ''
          }

          {
            typeof appState.currentUser.email !== 'undefined' ?
              this._renderLogoutLink() : ''
          }


        </div>
        <NotificationSystem ref="notificationSystem" />
      </div>
  }
}
