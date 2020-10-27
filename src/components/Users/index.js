import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/usersActions';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import Tabla from './Tabla';

class Users extends Component {
  componentDidMount() {
    if (!this.props.users.length) {
      this.props.getUsers();
    }

  }

  putContent = () => {
    if (this.props.loading) {
      return <Spinner />;
    }
    if (this.props.error) {
      return <Fatal message={this.props.error} />
    }
    return <Tabla />;
  };

  render() {
    return (
      <div>
        <h1>Usuarios</h1>
        {this.putContent()}
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usersReducer;
}

export default connect(mapStateToProps, usersActions)(Users);
