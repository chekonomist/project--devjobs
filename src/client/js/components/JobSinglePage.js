import React from 'react';
import {Link} from 'react-router-dom'

export default class JobSinglePage extends React.Component{

  render(){

    return <div className="job-single">
      <div className="job-single__info-col">
        <h2 className="job-single__title">
          {/* job title */ 'Laravel Developer'}
        </h2>
        <div className="job-single__subtitle">
          <span className="job-single__jobtype">
          { /* job full time or part time (convert boolean value to string value) */ 'Part Time' }
          </span>
          <span className="job-single__info">
            | {/* job location */ 'Queretaro'}

          </span>
          <span className="job-single__info">
            | $ {/* job salary */ 23500}
          </span>
        </div>
        <h4>Job Summary </h4>
        <p className="job-single__description">
          {/* job description */ 'Lorem ipsum dolor sit amet...'}
        </p>
      </div>
      <div className="job-single__company-col">

        <button className="job-single__applynow-btn">Apply Now</button>
        <hr className="job-single__divider"/>
        <img
          className="job-single__company-img"
          src={/* job's company image_link*/ 'http://flathash.com/wow'}
        />
        <h4 className="job-single__company-name">
          {/* job's company name*/ 'Breez Technologies' }
        </h4>
        <p className="job-single__company-location">
          {/* job's company location*/ 'Queretaro'}
        </p>

        <Link
          className="job_single__company-link"
          /* job's company id (dynamic value in ${}) */
          to={`/companies/${2}`}
        >
          Company Info
        </Link>
      </div>







    </div>
  }
}
