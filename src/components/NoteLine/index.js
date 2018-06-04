import React from 'react';
import './styles.css';

export default ({ note }) => (
  <div className="note note__wrapper">
    <div className="note note__title">{note.title}</div>
    <div className="note note__content">{note.content}</div>
  </div>
);
