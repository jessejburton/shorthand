import React from 'react';
import { connect } from 'react-redux';
import NoteListItem from './NoteListItem';

export const NoteList = (props) => {
  let iteration = 0;

  return (
    <div>
      <ul className="notes">
        {props.notes.map((note) => {
          iteration++;
          const className = iteration % 2 ? 'odd' : 'even';
          return (
            <NoteListItem note={note} key={note.id} itemClass={className} />
          );
        })}
      </ul>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  };
};

export default connect(mapStateToProps)(NoteList);