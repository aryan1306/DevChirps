import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../../actions/profile_actions';
import './createprofile.css';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });
  const [toDateDisabled, toggledDisabled] = useState(false);
  const {
    school,
    degree,
    fieldofstudy,
    location,
    from,
    to,
    current,
    description,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <h1 className='heading'>Add Education</h1>
      <small className='text-muted'>
        <h5>
          <i className='fas fa-graduation-cap'></i> Add School or Bootcamps that
          you have attended
        </h5>
      </small>
      <br />
      <small>* = required field</small>
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addEducation(formData, history);
        }}
      >
        <div class='form-group'>
          <input
            type='text'
            placeholder='* School'
            className='form-control'
            name='school'
            value={school}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Degree'
            className='form-control'
            name='degree'
            value={degree}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='Field of Study (eg: Computer Science)'
            className='form-control'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='Location'
            className='form-control'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggledDisabled(!toDateDisabled);
              }}
            />{' '}
            Currently Enrolled
          </p>
        </div>
        <div class='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={(e) => onChange(e)}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div class='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            className='form-control'
            placeholder='Program Description'
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <br />
        <Link className='btn btn-outline-warning mg-1 mg-r1' to='/dashboard'>
          <i class='fas fa-arrow-left'></i> Go Back
        </Link>
        <button
          type='submit'
          style={{ marginLeft: '0.5rem' }}
          className='btn btn-success mg-1'
        >
          Submit <i class='fas fa-check'></i>
        </button>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
