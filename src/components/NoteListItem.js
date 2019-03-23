import React from 'react'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NoteListItem(props) {

  const note = props.note;

  return (
    <li className={`note ${note.type.toLowerCase()} ${props.itemClass}`}>
      <div className={`type ${note.type.toLowerCase()}-filled`}></div>
      <div className="content">
        <div className={`category-helper ${note.type.toLowerCase()}`}>
          <div className="category">
            {note.category.length > 0 ? <strong>{note.category} ~ </strong> : <span></span>}<span className="date">{moment(note.dateEntered).format("MM/DD/YY @ hh:mma")}</span>
          </div>
          <div className="scheduled">
            {note.dateScheduled !== null ? <span className="date">{moment(note.dateScheduled).format("MMM Do, YYYY")}</span> : <span></span>}
          </div>
        </div>
        <div className={`text-helper ${note.type.toLowerCase()}`}>
          <div className={`text ${note.type.toLowerCase()}`}>{note.text}</div>
        </div>
      </div>
      <div className={`actions ${note.type.toLowerCase()}-filled`}>
        <div className="mark-complete">
          <label htmlFor={note.id}>
            <input id={note.id} className="hidden note-status" type="checkbox" />
            <div className="boxes">
              <span className="unchecked"><FontAwesomeIcon icon="square" /></span>
              <span className="checked"><FontAwesomeIcon icon="check-square" /></span>
            </div>
          </label>
        </div>
        <div className="edit-note">
          <FontAwesomeIcon icon="edit" />
        </div>
      </div>
    </li>
  )
}
