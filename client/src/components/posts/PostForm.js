import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post_actions';
const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  return (
    <Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}
      >
        <div className='form-group'>
          <h3
            style={{ borderRadius: '0.5rem', color: 'white' }}
            className='bg-primary pda-1'
          >
            Say Something
          </h3>
          <textarea
            id='text'
            className='form-control'
            value={text}
            rows='3'
            onChange={(e) => setText(e.target.value)}
            placeholder='Type Here'
          />
        </div>
        <button type='submit' value='Submit' className='btn btn-success'>
          Submit
        </button>
      </form>
    </Fragment>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
