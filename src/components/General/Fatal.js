import React from 'react';

const Fatal = ({ message }) => {
  return (
    <h2 className="center error">
      {message}
    </h2>
  );
};

export default Fatal;