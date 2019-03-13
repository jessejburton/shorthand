import React, { Component } from 'react';
import { connect } from 'react-redux';
import Note from './Note';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { startAddNote } from '../actions/notes';

export class NoteForm extends Component {
  constructor() {
    super();

    this.state = {
      category: '',
      dateEntered: null,
      dateScheduled: null,
      raw: '',
      text: '',
      type: '',
      endsIn: ''
    };
  }

  onNoteChange = (e) => {

    // Resize textarea if needed
    const textarea = e.target;
    textarea.style.cssText = 'height:auto;';
    textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';

    this.setState({
      raw: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const note = new Note(this.state.raw);
    this.props.startAddNote(note);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="note-form">
        <div className="input-field">
          <textarea
            placeholder="Write something..."
            className="textarea"
            value={this.state.raw}
            onChange={this.onNoteChange}
            id="note"
            data-length="500"
          />
          <label htmlFor="note">Try ending a note with ! to mark it as important</label>
        </div>
        <div>
          <button className="button"><FontAwesomeIcon icon="plus" /> Add Note</button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddNote: (note) => dispatch(startAddNote(note))
});

export default connect(
  undefined,
  mapDispatchToProps
)(NoteForm);
