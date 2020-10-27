import {
  GET_ALL,
  LOADING,
  ERROR,
  CHANGE_FIELD,
  SAVE_TASK,
  UPDATE_TASK,
  CLEAN,
} from '../types/tasksTypes';

const INITIAL_STATE = {
  tasks: {},
  loading: false,
  error: '',
  userId: '',
  title: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: ''
      };
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
    case CHANGE_FIELD:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    case SAVE_TASK:
      return {
        ...state,
        tasks: {},
        error: '',
        loading: false,
        userId: '',
        title: ''
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: action.payload
      };
    case CLEAN:
      return {
        ...state,
        userId: '',
        title: '',
      };
    default: return state;
  }
}