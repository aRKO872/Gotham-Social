import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {addLike, addDislike, deletePost} from '../../actions/post'

const PostItem = ({addDislike, addLike, deletePost,
  auth, post : {_id, user, text, name, photo, likes, dislikes, comments, date},
  showActions}) =>
<div className="post bg-white p-1 my-1">
  <div>
    <Link to={`/profile/${user}`}>
      <img
        className="round-img"
        src={photo}
        alt="User didn't upload profile pic"
      />
      <h4>{name}</h4>
    </Link>
  </div>
  <div>
    <p className="my-1">
      {text}
    </p>
     <p className="post-date">
        Posted on <Moment format="DD/MM/YY">{date}</Moment>
    </p>
    {showActions && <Fragment>
      <button type="button" onClick={() => addLike(_id)} className="btn btn-light">
        <i className="fas fa-thumbs-up"></i>{' '}
        <span>{likes.length > 0 ? <span>{likes.length}</span> : null}</span>
      </button>
      <button type="button" onClick={() => addDislike(_id)} className="btn btn-light">
        <i className="fas fa-thumbs-down"></i>{' '}
        <span>{dislikes.length > 0 ? <span>{dislikes.length}</span> : null}</span>
      </button>
      <Link to={`/post/${_id}`} className="btn btn-primary">
        Expand Citizen Post{' '} {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
      </Link>
      {!auth.loading && user === auth.user._id && (
        <button type="button" onClick={() => deletePost(_id)} className="btn btn-danger"><i className="fas fa-times"></i></button>
      )}
    </Fragment>}
  </div>
</div>

PostItem.defaultProps = {
  showActions : true 
}

PostItem.propTypes = {
  post : PropTypes.object.isRequired,
  auth : PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth : state.auth
});

export default connect(mapStateToProps, {addLike, addDislike, deletePost})(PostItem);
