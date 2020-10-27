import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as tasksActions from '../../actions/tasksActions'
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

class Save extends Component {

  async componentDidMount() {
    const {
      match: {
        params: {
          userId,
          taskId
        }
      },
      changeField,
      cleanForm,
      getTasks,
    } = this.props;


    if (!Object.keys(this.props.tasks).length) {
      await getTasks();
    }

    if (userId && taskId) {
      const task = this.props.tasks[userId][taskId];
      changeField('userId', task.userId);
      changeField('title', task.title);
    } else {
      cleanForm();
    }
  }

  save = async () => {
    const {
      match: {
        params: {
          taskId
        }
      },
      tasks,
      userId,
      title,
      add,
      edit,
      history: { push }
    } = this.props;

    const newTask = {
      userId,
      title,
      completed: false
    };

    if (userId && taskId) {
      const task = tasks[userId][taskId];
      const editedTask = {
        ...newTask,
        completed: task.completed,
        id: task.id
      };
      edit(editedTask);
    } else {
      await add(newTask);
    }

    push('/tasks');
  }

  disabled = () => {
    const { title, userId, loading } = this.props;

    if (loading) {
      return true;
    }
    if (!userId || !title) {
      return true;
    }
    return false;
  }

  showAction = () => {
    const { error, loading } = this.props;

    if (loading) {
      return <Spinner />
    }

    if (error) {
      return <Fatal message={error} />
    }
  }

  render() {
    return (
      <div>
        <h1>
          Guardar Tarea
        </h1>
        Usuario id:
        <input
          type="number"
          value={this.props.userId}
          name="userId"
          onChange={({ target: { name, value } }) => this.props.changeField(name, value)}
        />
        <br />
        <br />
        Título:
        <input
          type="text"
          value={this.props.title}
          name="title"
          onChange={({ target: { name, value } }) => this.props.changeField(name, value)}
        />
        <br />
        <br />
        <button onClick={this.save} disabled={this.disabled()}>
          Guardar
        </button>
        {this.showAction()}
      </div>
    );
  }
}

const mapStateToProps = ({ tasksReducer }) => tasksReducer;

export default connect(mapStateToProps, tasksActions)(Save);