import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createProfile,
  getCurrentProfile,
} from '../../../actions/profile_actions';
import './createprofile.css';

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: '',
};

const EditProfile = ({
  profile: { profile, loading },
  getCurrentProfile,
  createProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);
  const [displaySocial, toggleSocial] = useState(false);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills)) {
        profileData.skills = profileData.skills.join(', ');
      }
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <Fragment>
      <h1 className='heading'>Create Profile</h1>
      <small className='text-muted'>
        <h5>
          <i className='fas fa-user-alt'></i> Let's setup your Profile
        </h5>
      </small>
      <br />
      <small>* = required field</small>
      <br />
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select
            className='form-control'
            name='status'
            value={status}
            onChange={(e) => onChange(e)}
            id='exampleSelect1'
          >
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small>Give us an idea about your Professional status</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='company'
            className='form-control'
            placeholder='Company'
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small>Could be your own company or one you work</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='website'
            className='form-control'
            placeholder='Website'
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small>Could be your own Website or one you company website</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            className='form-control'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='skills'
            className='form-control'
            placeholder='*Skills'
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small>
            Please use comma seperated values (eg. HTML, CSS, Javascript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='githubusername'
            className='form-control'
            placeholder='Github Username'
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small>
            If you want yout latest repos to appear please provide your github
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            name='bio'
            className='form-control'
            rows='4'
            placeholder='Bio'
            value={bio}
            onChange={(e) => onChange(e)}
          />
          <small>Provide us with a short bio of yourself</small>
        </div>
        <div className='my-2'>
          <button
            type='button'
            onClick={() => toggleSocial(!displaySocial)}
            className='btn btn-outline-info mg-1'
          >
            Add Social Network Links
          </button>
          <span> </span>
          <span>Optional</span>
        </div>
        {displaySocial && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <span> </span>
              <input
                type='text'
                className='form-control'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <span> </span>
              <input
                type='text'
                className='form-control'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <span> </span>
              <input
                type='text'
                className='form-control'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <span> </span>
              <input
                type='text'
                className='form-control'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <span> </span>
              <input
                type='text'
                className='form-control'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}
        <br />
        <Link className='btn btn-outline-warning mg-1 mg-r1' to='/dashboard'>
          <i class='fas fa-arrow-left'></i> Go Back
        </Link>
        <input type='submit' className='btn btn-success mg-1' />
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
