import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getPost } from '../../actions/post_actions'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({getPost, post:{ post, loading }, match}) => {
    useEffect(()=>{
        getPost(match.params.id)
    },[getPost, match.params.id])
    return (loading || post === null ? <Spinner/> : 
        <Fragment>
            <Link to='/posts' className='btn btn-light mg-1'><i className='fas fa-arrow-left'></i> Back to Posts</Link>
            <PostItem post={post} showActions={false}/>
            <CommentForm postId={post._id} />
            <div className="comments">
                {post.comments.map(comment =>(
                    <CommentItem key={comment._id} comment={comment} className='comment' postId={post._id}/>
                ))}
            </div>
        </Fragment>
    )
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}
const mapStateToProps = state =>({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)
