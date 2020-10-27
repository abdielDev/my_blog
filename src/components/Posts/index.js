import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/usersActions';
import * as postsActions from '../../actions/postsActions';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import Comments from './Comments';

class Posts extends Component {

  async componentDidMount() {
    const {
      getUsers,
      getPostsByUser,
      match: {
        params: {
          key
        }
      }
    } = this.props
    if (!this.props.usersReducer.users.length) {
      await getUsers();
    }
    if (this.props.usersReducer.error) {
      return;
    }
    if (!('posts_key' in this.props.usersReducer.users[key])) {
      getPostsByUser(key);
    }
  }

  putUser = () => {
    const {
      usersReducer,
      match: {
        params: {
          key
        }
      }
    } = this.props;
    if (usersReducer.error) {
      return <Fatal message={usersReducer.error} />
    }
    if (!usersReducer.users.length || usersReducer.loading) {
      return <Spinner />
    }

    const name = usersReducer.users[key].name;

    return (
      <h1>
        Publicaciones de {name}
      </h1>
    );
  };

  putPosts = () => {
    const {
      usersReducer,
      usersReducer: { users },
      postsReducer,
      postsReducer: { posts },
      match: { params: { key } },
    } = this.props;

    if (!users.length) return;
    if (usersReducer.error) return;

    if (postsReducer.loading) {
      return <Spinner />;
    }
    if (postsReducer.error) {
      return <Fatal message={postsReducer.error} />;
    }
    if (!posts.length) return;
    if (!('posts_key' in users[key])) return;

    const { posts_key } = users[key];

    return this.showInfo(posts[posts_key], posts_key);
  }

  showInfo = (posts, posts_key) => (
    posts.map((post, commentsKey) => (
      <div
        className="postTitle"
        key={post.id}
        onClick={() => this.showComments(posts_key, commentsKey, post.comments)}
      >
        <h2>
          {post.title}
        </h2>
        <h3>
          {post.body}
        </h3>
        {
          (post.open) ? <Comments comments={post.comments} /> : ''
        }
      </div>
    ))
  );

  showComments = (posts_key, commentsKey, comments) => {
    this.props.openClose(posts_key, commentsKey);
    if (!comments.length) {
      this.props.getComments(posts_key, commentsKey);
    }
  };

  render() {
    return (
      <div>
        {this.putUser()}
        {this.putPosts()}
      </div>
    );
  }
}

const mapStateToProps = ({ usersReducer, postsReducer }) => {
  return {
    usersReducer,
    postsReducer
  };
};

const mapDispatchToProps = {
  ...usersActions,
  ...postsActions
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);