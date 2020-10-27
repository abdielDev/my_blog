import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

const Comments = ({ commentsLoading, commentsError, comments }) => {

  if (commentsError && !comments.length) {
    return <Fatal message={commentsError} />;
  }

  if (commentsLoading && !comments.length) {
    return <Spinner />;
  }

  const putComments = () => (
    comments.map(comment => (
      <li key={comment.id}>
        <b>
          <u>
            {comment.email}
          </u>
        </b>
        <br />
        {comment.body}
      </li>
    ))
  );
  return (
    <ul>
      {putComments()}
    </ul>
  );
};

const mapStateToProps = ({ postsReducer }) => postsReducer;

export default connect(mapStateToProps)(Comments);