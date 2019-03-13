import Note, { numberToDate } from '../../components/Note';
import moment from 'moment';

let currentMonth, currentYear, full;

beforeEach(() => {

  currentMonth = moment().format('MM');
  currentYear = moment().format('YYYY');

  full = "Category, This is an important note with a category and scheduled date ! 02252019";

});


test('Should return a valid date from an 8 digit number', () => {

  const number = "02252019";
  const date = numberToDate(number);

  expect(date).toBe("02-25-2019");

});

test('Should return a valid date from a 6 digit number', () => {

  const number = "032218";
  const date = numberToDate(number);

  expect(date).toBe("03-22-2018");

});

test('Should return a valid date from a 4 digit number', () => {

  const number = "0322";
  const date = numberToDate(number);

  expect(date).toBe(`03-22-${currentYear}`);

});

test('Should return a valid date from a 2 digit number', () => {

  const number = "15";
  const date = numberToDate(number);

  expect(date).toBe(`${currentMonth}-15-${currentYear}`);

});

test('Should return a valid date from a 1 digit number', () => {

  const number = "3";
  const date = numberToDate(number);

  expect(date).toBe(`${currentMonth}-03-${currentYear}`);

});

test('Should return a Note with the correct information', () => {
  const note = new Note(full);

  expect(note.category).toBe("Category");
  expect(note.dateScheduled).toBe("02-25-2019");
  expect(note.raw).toBe(full);
  expect(note.text).toBe("This is an important note with a category and scheduled date");
  expect(note.type).toBe("Important");

});

