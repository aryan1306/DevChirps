import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Moment from 'react-moment'
import { Link } from 'react-router-dom';
import { deleteComment } from '../../actions/post_actions';

const CommentItem = ({postId, comment:{_id, text, name, avatar, user, date}, auth, deleteComment}) => {
    return (
        <Fragment>
            <div>
                <div className='comment-card'>
                <Link to={`/profile/${user}`}>
                    <img src={avatar} alt={name} className="comment-img"/>
                    <h4>{name}</h4>
                </Link>
                </div>
                <div className='pda-1'>
                    <p>
                        {text}
                    </p>
                    <p className="post-date">
                        Posted On <Moment format='YYYY/MM/DD'>{date}</Moment>
                    </p>
                    {/* {!auth.loading && user === auth.user._id && (
                        <button className='btn btn-danger'
                        onClick={e => deleteComment(postId, _id)}
                        type='button'>
                            <i className="fas fa-times"></i>
                        </button>
                    )} */}
                </div>
            </div>
        </Fragment>
    )
}

CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
}
const mapStateToProps = state =>({
    auth: state.auth
})
export default connect(mapStateToProps, { deleteComment })(CommentItem)
