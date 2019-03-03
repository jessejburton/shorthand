import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parseStringToNote } from '../helpers/Note';

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
    this.setState({
      raw: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    console.log(
      parseStringToNote(this.state.raw).dateScheduled.format('MMMM Do YYYY')
    );
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
