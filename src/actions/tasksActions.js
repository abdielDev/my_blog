import axios from 'axios';
import {
  GET_ALL,
  LOADING,
  ERROR,
  CHANGE_FIELD,
  SAVE_TASK,
  UPDATE_TASK,
  CLEAN,
} from '../types/tasksTypes';

export const getTasks = () => async (dispatch) => {
  dispatch({
    type: LOADING
  });
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

    const tasks = {};
    response.data.map((task) => (
      tasks[task.userId] = {
        ...tasks[task.userId],
        [task.id]: {
          ...task
        }
      }
    ))

    dispatch({
      type: GET_ALL,
      payload: tasks
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Información de tareas no disponible'
    });
  }
};

export const changeField = (name, value) => (dispatch) => {
  dispatch({
    type: CHANGE_FIELD,
    payload: {
      name,
      value
    }
  });
};

export const add = (newTask) => async (dispatch) => {
  dispatch({
    type: LOADING
  });

  try {
    await axios.post('https://jsonplaceholder.typicode.com/todos', newTask);

    dispatch({
      type: SAVE_TASK,
    })

  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Intenté más tarde'
    });
  }
};

export const edit = (editedTask) => async (dispatch) => {
  dispatch({
    type: LOADING
  });

  try {
    await axios.put(`https://jsonplaceholder.typicode.com/todos/${editedTask.id}`, editedTask);

    dispatch({
      type: SAVE_TASK,
    })

  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Intenté más tarde'
    });
  }
}

export const changeCheck = (userId, taskId) => (dispatch, getState) => {
  const { tasks } = getState().tasksReducer;
  const selected = tasks[userId][taskId];

  const updated = {
    ...tasks,
  };
  updated[userId] = {
    ...tasks[userId]
  };
  updated[userId][taskId] = {
    ...tasks[userId][taskId],
    completed: !selected.completed
  };

  dispatch({
    type: UPDATE_TASK,
    payload: updated
  });
};

export const remove = (taskId) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });

  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${taskId}`);

    dispatch({
      type: GET_ALL,
      payload: {}
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Servicio no disponible.'
    });
  }
};

export const cleanForm = () => (dispatch) => {
  dispatch({
    type: CLEAN
  });
}