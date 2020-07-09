import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div className='profile-about mg-1'>
      <h3 className='text-light'>{name}'s Bio</h3>
      {bio && <p className='text-light mg-1'>{bio}</p>}
      <hr />
      <h3 className='text-light skills'>Skill Set</h3>
      <ul className='mg-1'>
        {skills.map((skill, index) => (
          <li key={index} className='text-light'>
            <i className='fas fa-check'></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
