import React from 'react';
import NoteForm from './NoteForm';
import NoteList from './NoteList';

const DashboardPage = (props) => (
  <div>
    <NoteForm />
    <h2>Recent Notes</h2>
    <NoteList />
  </div>
);

export default DashboardPage;
