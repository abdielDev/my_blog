import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Tabla = ({ users }) => {
  const putRows = () => users.map((user, key) => (
    <tr key={user.id}>
      <td>
        {user.name}
      </td>
      <td>
        {user.email}
      </td>
      <td>
        {user.website}
      </td>
      <td>
        <Link to={`/posts/${key}`}>
          <div className="eye-solid icon"></div>
        </Link>
      </td>
    </tr>
  ));
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>
              Nombre
              </th>
            <th>
              Correo
              </th>
            <th>
              Enlace
              </th>
          </tr>
        </thead>
        <tbody>
          {putRows()}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = reducers => {
  return reducers.usersReducer;
}

export default connect(mapStateToProps)(Tabla);