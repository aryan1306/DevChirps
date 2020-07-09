import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({
  getProfileById,
  match,
  profile: { profile, user, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light mg-1 mgr-1'>
            <i className='fas fa-arrow-left'></i> Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Fragment>
                <Link to='/edit-profile' className='btn btn-dark mg-1'>
                  Edit Profile
                </Link>
              </Fragment>
            )}
          <div className='profile-grid mg-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-light '>
              <h2>Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      className='pd-2'
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <Fragment>
                  <h4>No Experience Credentials</h4>
                </Fragment>
              )}
            </div>

            <div className='profile-edu bg-light '>
              <h2>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      className='pd-2'
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <Fragment>
                  <h4>No Education Credentials</h4>
                </Fragment>
              )}
            </div>

            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
