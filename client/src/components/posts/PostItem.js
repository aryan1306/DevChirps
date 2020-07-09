import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { removeLike, addLike, deletePost } from '../../actions/post_actions';

const PostItem = ({
  auth,
  addLike,
  removeLike,
  deletePost,
  showActions,
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
  return (
    <Fragment>
      <div className='post bg-white p-1 mg-1'>
        <div>
          <Link to={`/profile/${user}`}>
            <img className='round-img' src={avatar} alt={`${name}`} />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className='mg-1'>{text}</p>
          <p className='post-date'>
            Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
          </p>
          {showActions && (
            <Fragment>
              <button
                type='button'
                onClick={(e) => addLike(_id)}
                style={{ marginRight: '0.5rem' }}
                className='btn btn-light'
              >
                <i className='fas fa-thumbs-up'></i> <span>{likes.length}</span>
              </button>
              <button
                type='button'
                onClick={(e) => removeLike(_id)}
                style={{ marginRight: '0.5rem' }}
                className='btn btn-light'
              >
                <i className='fas fa-thumbs-down'></i>
              </button>
              <Link to={`/post/${_id}`} className='btn btn-info mgr-1'>
                Discussion{' '}
                {comments.length > 0 && (
                  <span className='badge badge-light'>{comments.length}</span>
                )}
              </Link>
              {!auth.loading && user === auth.user._id && (
                <button
                  onClick={(e) => deletePost(_id)}
                  type='button'
                  className='btn btn-outline-danger'
                >
                  <i className='fas fa-times'></i>
                </button>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};
PostItem.defaultProps = {
  showActions: true,
};
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
