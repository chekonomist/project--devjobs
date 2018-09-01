import React from 'react';
import {Link} from 'react-router-dom'
import request from 'superagent'

export default class Dashboard extends React.Component{
  constructor(args){
    super(...args)

  }


  render(){
      const appState = this.props.appState
      if(!this.props.appState.currentUser.id){
        return <div className="page-dashboard">
          <h2>Access Restricted</h2>
          <p>User must authenticate</p>
        </div>
      }

      return <div className="page-dashboard">
        <h1>Dashboard: </h1>
        <h3 className="page-dashboard__username">{appState.currentUser.email}</h3>
        <div className="page-dashboard__user-actions">
          <Link to="/dashboard/create-profile" className="page-dashboard__action-btn page-dashboard__action-btn--user-profile">
            <span>Edit Company Profile  </span>
            <i className="ion-gear-a"/>
          </Link>
          <Link to="/dashboard/new-job" className="page-dashboard__action-btn page-dashboard__action-btn--new-job">
            <span>Post New Job</span>

            <i className="ion-plus-circled" />
          </Link>
          <Link to="/dashboard/view-jobs" className="page-dashboard__action-btn page-dashboard__action-btn--view-jobs">
            <span>View Current Jobs</span>
            <i className="ion-clipboard"/>
          </Link>
        </div>

      </div>
  }
}
