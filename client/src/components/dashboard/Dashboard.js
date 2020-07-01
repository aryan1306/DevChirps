import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  deleteAccount,
} from '../../actions/profile_actions';
import DashboardAction from './DashboardAction';
import Experience from './Experience';
import Education from './Education';

import './dashboard.css';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { loading, profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='display-5 jum-mg'>Welcome {user && user.name}!</h1>
      <hr />
      {profile !== null ? (
        <Fragment>
          <DashboardAction />
          <Experience experience={profile.experience} />
          <hr />
          <Education education={profile.education} />
          <hr />
          <button
            onClick={() => deleteAccount()}
            className='btn btn-danger mg-2'
          >
            {' '}
            Delete Account
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <div className='card border-primary mb-3'>
            <div className='card-body cb'>
              <h3 className='card-title'>Seems empty here...</h3>
              <h5 className='card-h5'>
                Let's get started by creating a Profile
              </h5>
              <Link
                to='/create-user-profile'
                className='btn btn-outline-primary'
              >
                Create a Profile
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
