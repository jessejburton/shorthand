import moment from 'moment';

export const parseStringToNote = (raw) => {
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
  const text = rawTrimmed.substr(firstComma + 1, rawTrimmed.length + 1).trim(); // Everything after the first comma

  // Handle the type
  const endsIn = rawTrimmed.substr(rawTrimmed.length - 1);
  let type = 'Default';
  switch (endsIn) {
    case '!':
      type = 'Important';
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
      'Note';
  }

  // Handle the dates
  const dateEntered = moment();
  let dateScheduled = null;

  // Find out if the note ends in | [0-9].
  const pattern = /(\| [0-9]+)$/;
  if (raw.match(pattern)) {
    const number = raw.substr(raw.lastIndexOf(' ') + 1, raw.length);
    dateScheduled = parseNumberToDate(number);
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

const parseNumberToDate = (number) => {
  const currentMonth = moment().format('MM');
  const currentYear = moment().format('YYYY');
  const str = number.toString();

  switch (str.length) {
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
