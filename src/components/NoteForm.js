import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

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
    const note = this.parseNote(e.target.value);
    this.setState(() => note);
  };

  parseNote = (raw) => {
    // Trim whitespace - can't trim raw directly or the input won't allow spaces
    const rawTrimmed = raw.trim();

    // Handle the category
    let category = '';
    const firstComma = rawTrimmed.indexOf(',');
    if (firstComma >= 0) {
      category = rawTrimmed.substr(0, firstComma); // Everything before the first comma
    }
    // TODO add a buffer on this, i.e. if the comma is more than 3 words in then prompt isCategory?

    // Handle the text
    const text = rawTrimmed
      .substr(firstComma + 1, rawTrimmed.length + 1)
      .trim(); // Everything after the first comma

    // Handle the type
    const endsIn = rawTrimmed.substr(rawTrimmed.length - 1);
    let type = 'Default';
    switch (endsIn) {
      case '!':
        type = 'Important';
        break;
      case '.':
        type = 'Default';
        break;
      case '?':
        type = 'Question';
        break;
      case '*':
        type = 'Idea';
        break;
      case '|':
        type = 'Todo';
        break;
      default:
        'Default';
    }

    // Handle the dates
    const dateEntered = moment();
    let dateScheduled = null;

    // Find out if the note ends in a number and has a | in it.
    if (!isNaN(endsIn)) {
      dateScheduled = moment();
    }

    return {
      category,
      dateEntered,
      dateScheduled,
      raw,
      text,
      type,
      endsIn
    };
  };

  onSubmit = (e) => {
    e.preventDefault();

    console.log(this.state.raw);
    console.log(this.parseNote(this.state.raw));
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="form">
        <textarea
          placeholder="Write something..."
          className="textarea"
          value={this.state.raw}
          onChange={this.onNoteChange}
        />
        <div>
          <button className="button">Record Note</button>
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
