import React from 'react';
import NoteForm from '../forms/NoteForm';
import NoteList from '../NoteList';

const NotePage = (props) => (
  <div>
    <NoteForm />
    <h2 className="logo-font">Notes</h2>
    <NoteList />
  </div>
);

export default NotePage;
