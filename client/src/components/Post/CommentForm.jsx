import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { addComment } from '../../actions/post_actions';
import { connect } from 'react-redux';

const CommentForm = ({postId, addComment}) => {
    const [text, setText] = useState('')
    return (
        <form onSubmit={e =>{
            e.preventDefault()
            addComment(postId, { text })
            setText('')
        }}>
            <div className='form-group hover-class'>
                <textarea width='100%' type="text" onChange={e=> setText(e.target.value)} className='form-control' value={text} placeholder='Add a Comment...' />
                <button type="submit" value='Submit' className="btn btn-info mg-1">Post a Comment <i className="fas fa-paper-plane"></i></button>
            </div>
        </form>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, { addComment })(CommentForm)
