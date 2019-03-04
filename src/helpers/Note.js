import moment from 'moment';

const enders = ['!', '*', '?', '|'];

export default class Note {
  constructor(raw) {
    this.raw = raw.trim();
    this.dateEntered = moment();
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
    this.setCategory(category);
  };

  parseType = () => {
    const lastEnderIndex = this.getLastEnderIndex();
    let endsIn = lastEnderIndex >= 0 ? this.raw.substr(lastEnderIndex, 1) : '';

    switch (endsIn) {
      case '!':
        return 'Important';
      case '?':
        return 'Question';
      case '*':
        return 'Idea';
      case '|':
        return 'Todo';
      default:
        return 'Note';
    }
  };

  parseText = () => {
    // get everything between the first comma and the last ender
    const firstComma = this.raw.indexOf(',');
    const lastEnderIndex = this.getLastEnderIndex();
    const length =
      this.raw.length - (this.raw.length - lastEnderIndex + 1 + firstComma);

    console.log(firstComma, lastEnderIndex, length, this.raw.length);
    this.text = this.raw.substr(firstComma + 1, length).trim(); // Everything after the first comma
  };

  parseDateScheduled = () => {
    // Find out if the note ends in an ender and a number.
    let dateScheduled = null;
    let pattern = new RegExp(`([${enders.join('')}] [0-9]+)$`);

    if (this.raw.match(pattern)) {
      const number = this.raw.substr(this.raw.lastIndexOf(' ') + 1);
      dateScheduled = this.numberToDate(number);
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

  numberToDate = (number) => {
    const currentMonth = moment().format('MM');
    const currentYear = moment().format('YYYY');
    const str = number.toString();

    switch (str.length) {
      case 1:
        return moment(`${currentMonth}0${str}${currentYear}`, 'MMDDYYYY');
      case 2:
        return moment(`${currentMonth}${str}${currentYear}`, 'MMDDYYYY');
      case 4:
        return moment(
          `${str.substr(0, 2)}${str.substr(2, 3)}${currentYear}`,
          'MMDDYYYY'
        );
      case 6:
        return moment(
          `${str.substr(0, 2)}${str.substr(2, 2)}${'20' + str.substr(4, 5)}`,
          'MMDDYYYY'
        );
      case 8:
        return moment(
          `${str.substr(0, 2)}${str.substr(2, 2)}${str.substr(4, 7)}`,
          'MMDDYYYY'
        );
      default:
        return moment();
    }
  };
}
