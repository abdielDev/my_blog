import axios from 'axios';
import {
  GET_ALL,
  ERROR,
  LOADING,
  GET_COMMENTS,
  COMMENT_ERROR,
  COMMENT_LOADING,
} from '../types/postsTypes';
import * as usersTypes from '../types/usersTypes';

const { GET_ALL: GET_USERS } = usersTypes;

export const getPostsByUser = (key) => async (dispatch, getState) => {
  dispatch({
    type: LOADING
  });

  const { users } = getState().usersReducer;
  const { posts } = getState().postsReducer;
  const userId = users[key].id;

  try {
    const response = await axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${userId}`);

    const news = response.data.map(post => ({
      ...post,
      comments: [],
      open: false
    }));

    const posts_updated = [
      ...posts,
      news
    ];

    dispatch({
      type: GET_ALL,
      payload: posts_updated
    });

    const posts_key = posts_updated.length - 1;
    const users_updated = [...users];
    users_updated[key] = {
      ...users[key],
      posts_key
    };

    dispatch({
      type: GET_USERS,
      payload: users_updated
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Publicaciones no disponibles'
    });
  }
}

export const openClose = (posts_key, commentsKey) => (dispatch, getState) => {
  const { posts } = getState().postsReducer;
  const selected = posts[posts_key][commentsKey];

  const updated = {
    ...selected,
    open: !selected.open,
  };

  const updatedPosts = [...posts];
  updatedPosts[posts_key] = [
    ...posts[posts_key]
  ];

  updatedPosts[posts_key][commentsKey] = updated;

  dispatch({
    type: GET_ALL,
    payload: updatedPosts
  })
};

export const getComments = (posts_key, commentsKey) => async (dispatch, getState) => {
  dispatch({
    type: COMMENT_LOADING
  });
  const { posts } = getState().postsReducer;
  const selected = posts[posts_key][commentsKey];

  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${selected.id}`);

    const updated = {
      ...selected,
      comments: response.data
    };

    const updatedPosts = [...posts];
    updatedPosts[posts_key] = [
      ...posts[posts_key]
    ];

    updatedPosts[posts_key][commentsKey] = updated;

    dispatch({
      type: GET_COMMENTS,
      payload: updatedPosts
    });
  } catch (error) {
    dispatch({
      type: COMMENT_ERROR,
      payload: 'Comentarios no disponibles'
    });
  }
}