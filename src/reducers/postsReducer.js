import {
  GET_ALL,
  ERROR,
  LOADING,
  GET_COMMENTS,
  COMMENT_ERROR,
  COMMENT_LOADING,
} from '../types/postsTypes';

const INITIAL_STATE = {
  posts: [],
  loading: false,
  error: '',
  commentsLoading: false,
  commentsError: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: ''
      }
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case GET_COMMENTS:
      return {
        ...state,
        posts: action.payload,
        commentsLoading: false,
        commentsError: ''
      }
    case COMMENT_LOADING:
      return {
        ...state,
        commentsLoading: true
      };
    case COMMENT_ERROR:
      return {
        ...state,
        commentsError: action.payload,
        commentsLoading: false
      };
    default: return state;
  }
}