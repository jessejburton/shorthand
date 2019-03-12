import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { noteIconByType } from '../helpers/Note';

export const NoteList = (props) => (
  <div>
    <ul className="notes">
      {props.notes.map((note) => {
        return (
          <li className={`note ${note.type.toLowerCase()}`} key={note.id}>
            <div className={`type ${note.type.toLowerCase()}-filled`}>{noteIconByType(note)}</div>
            <div className="content">
              <span className="title">{note.category}</span>
              <p>{note.text}</p>
            </div>
            <div className="acions">
              <label htmlFor={note.id}>
                <input id={note.id} className="filled-in" type="checkbox" />
                <span></span>
              </label>
            </div>
          </li>
        );
      })}
    </ul>
  </div>
)

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  };
};

export default connect(mapStateToProps)(NoteList);