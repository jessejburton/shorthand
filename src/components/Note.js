import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const enders = ['!', '*', '?', '|'];

export default class Note {
  constructor(raw) {
    this.raw = raw.trim();
    this.dateEntered = moment().format("MM/DD/YYYY");
    this.category = '';
    this.text = '';
    this.dateScheduled = null;
    this.type = '';

    // Parse the note from the raw data
    this.parseNoteFromRaw();
  }

  // Parse the Note from Raw Text
  parseNoteFromRaw() {
    this.parseCategory();
    this.parseText();
    this.parseDateScheduled();
    this.parseType();
  }

  /* SETTERS */
  setCategory(category) {
    this.category = category;
  }

  setText(text) {
    this.text = text;
  }

  setDateScheduled(dateScheduled) {
    this.dateScheduled = dateScheduled;
  }

  setType(type) {
    this.type = type;
  }

  /* PARSERS */
  parseCategory = () => {
    let category = '';

    const firstComma = this.raw.indexOf(',');
    if (firstComma >= 0) {
      category = this.raw.substr(0, firstComma); // Everything before the first comma
    }
    // TODO add a buffer on this, i.e. if the comma is more than 3 words in then prompt isCategory?
    this.setCategory(category.trim());
  };

  parseType = () => {
    const lastEnderIndex = this.getLastEnderIndex();
    let endsIn = lastEnderIndex >= 0 ? this.raw.substr(lastEnderIndex, 1) : '';

    switch (endsIn) {
      case '!':
        this.setType('Important');
        break;
      case '?':
        this.setType('Question');
        break;

      case '*':
        this.setType('Idea');
        break;

      case '|':
        this.setType('Todo');
        break;

      default:
        this.setType('Default');
        break;

    }
  };

  parseText = () => {
    // get everything between the first comma and the last ender
    let firstComma = this.raw.indexOf(',');
    const lastEnderIndex = this.getLastEnderIndex();

    if (lastEnderIndex == -1) {
      this.setText(this.raw.substr(firstComma + 1, this.raw.length).trim());
    } else {
      const length =
        this.raw.length - (this.raw.length - lastEnderIndex + 1 + firstComma);

      this.setText(this.raw.substr(firstComma + 1, length).trim()); // Everything after the first comma
    }


  };

  parseDateScheduled = () => {
    // Find out if the note ends in an ender and a number.
    let dateScheduled = null;
    let pattern = new RegExp(`([${enders.join('')} ][0-9]+)$`);

    if (this.raw.match(pattern)) {
      const index = this.raw.match(pattern).index;
      const number = this.raw.substr(index, 10).trim();
      dateScheduled = numberToDate(number);
    }

    this.dateScheduled = dateScheduled;
  };

  /* HELPERS */
  getLastEnderIndex = () => {
    let index = -1;
    enders.forEach((ender) => {
      index =
        this.raw.lastIndexOf(ender) > index
          ? this.raw.lastIndexOf(ender)
          : index;
    });
    return index;
  };

}

export const noteIconByType = (note) => {
  let icon = '';

  switch (note.type) {
    case 'Idea':
      icon = 'lightbulb';
      break;
    case 'Question':
      icon = 'question';
      break;
    case 'Important':
      icon = 'exclamation';
      break;
    case 'Todo':
      icon = 'check';
      break;
    default:
      icon = '';
      break;
  }

  if (icon.length) {
    return (
      <FontAwesomeIcon icon={icon} />
    )
  } else {
    return (<span></span>);
  }
}

export const numberToDate = (number) => {
  const currentMonth = moment().format('MM');
  const currentYear = moment().format('YYYY');
  const str = number.toString();
  let dateString = "";

  switch (str.length) {
    case 1:
      dateString = `${currentYear}-${currentMonth}-0${str}`;
      break;
    case 2:
      dateString = `${currentYear}-${currentMonth}-${str}`;
      break;
    case 4:
      dateString = `${currentYear}-${str.substr(0, 2)}-${str.substr(2, 2)}`;
      break;
    case 6:
      dateString = `${'20' + str.substr(4, 2)}-${str.substr(0, 2)}-${str.substr(2, 2)}`;
      break;
    case 8:
      dateString = `${str.substr(4, 4)}-${str.substr(0, 2)}-${str.substr(2, 2)}`;
      break;
    default:
      return null;
  }

  return moment(dateString).format("MM-DD-YYYY");
};