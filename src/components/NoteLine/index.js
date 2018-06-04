import React from 'react';

export default ({ note }) => (
  <div>
    <h2>{note.title}</h2>
    <p>{note.content}</p>
  </div>
);
