import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as tasksActions from '../../actions/tasksActions';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import { Link } from 'react-router-dom';

class Tasks extends Component {

  async componentDidMount() {
    if (!Object.keys(this.props.tasks).length) {
      await this.props.getTasks();
    }
  }

  async componentDidUpdate() {
    const { tasks, loading, getTasks } = this.props;

    if (!Object.keys(tasks).length && !loading) {
      await getTasks();
    }
  }

  showContent = () => {
    const { error, loading, tasks } = this.props;

    if (loading) {
      return <Spinner />
    }

    if (error) {
      return <Fatal message={error} />
    }

    return Object.keys(tasks).map((userId) => (
      <div key={userId}>
        <h2>
          Usuario {userId}
        </h2>
        <div className="tasks_container">
          {this.putTasks(userId)}
        </div>
      </div>
    ))
  }

  putTasks = (userId) => {
    const { tasks, changeCheck, remove } = this.props;
    const byUser = {
      ...tasks[userId]
    };

    return Object.keys(byUser).map(taskId => (
      <div key={taskId}>
        <input
          type="checkbox"
          defaultChecked={byUser[taskId].completed}
          onChange={() => changeCheck(userId, taskId)}
        />
        {
          byUser[taskId].title
        }
        <Link to={`/tasks/save/${userId}/${taskId}`}>
          <button className="marginLeft">
            Editar
          </button>
        </Link>
        <button onClick={() => remove(taskId)} className="marginLeft">
          Eliminar
        </button>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <button>
          <Link to="/tasks/save">
            Agregar
          </Link>
        </button>
        {this.showContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ tasksReducer }) => tasksReducer;

export default connect(mapStateToProps, tasksActions)(Tasks);