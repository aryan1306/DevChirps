import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './dashboardactions.css';

const DashboardAction = () => {
  return (
    <Fragment>
      <div className='container-main'>
        <Link
          style={{ margin: '0.5rem 1.5rem' }}
          className='btn btn-outline-secondary btn-sm mg-1'
          to='/edit-profile'
        >
          <i className='fas fa-pen'></i> Edit Profile
        </Link>
        <Link
          style={{ margin: '0.5rem 1.5rem' }}
          className='btn btn-outline-secondary btn-sm mg-1'
          to='/add-experience'
        >
          <i className='fas fa-info-circle'></i> Add Experience
        </Link>
        <Link
          style={{ margin: '0.5rem 1.5rem' }}
          className='btn btn-outline-secondary btn-sm mg-1'
          to='/add-education'
        >
          <i className='fas fa-graduation-cap'></i> Add Education
        </Link>
      </div>
    </Fragment>
  );
};
export default DashboardAction;
