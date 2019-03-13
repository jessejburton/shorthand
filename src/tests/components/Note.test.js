import Note, { numberToDate } from '../../components/Note';
import moment from 'moment';

let currentMonth, currentYear, full, noCategory, noScheduled, whiteSpace, noCategoryOrTypeOrDate;

beforeEach(() => {

  currentMonth = moment().format('MM');
  currentYear = moment().format('YYYY');

  full = "Category, This is an important note with a category and scheduled date ! 02252019";
  noCategory = "This is an important note with a category and scheduled date ? 03142019";
  noScheduled = "Category, This is an important note with a category and scheduled date*";
  whiteSpace = " Category  , This is an important note with a category and scheduled date   |   04102017";
  noCategoryOrTypeOrDate = "This is an important note with no category type or scheduled date.";

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

test('Should return a Full Note with the correct information', () => {
  const note = new Note(full);

  expect(note.category).toBe("Category");
  expect(note.dateScheduled).toBe("02-25-2019");
  expect(note.raw).toBe(full);
  expect(note.text).toBe("This is an important note with a category and scheduled date");
  expect(note.type).toBe("Important");

});


test('Should return a Full Note with the correct information - removing whitespace', () => {
  const note = new Note(whiteSpace);

  expect(note.category).toBe("Category");
  expect(note.dateScheduled).toBe("04-10-2017");
  expect(note.raw).toBe(whiteSpace.trim());
  expect(note.text).toBe("This is an important note with a category and scheduled date");
  expect(note.type).toBe("Todo");

});


test('Should return a Note with no category', () => {
  const note = new Note(noCategory);

  expect(note.category).toBe("");
  expect(note.dateScheduled).toBe("03-14-2019");
  expect(note.raw).toBe(noCategory);
  expect(note.text).toBe("This is an important note with a category and scheduled date");
  expect(note.type).toBe("Question");

});

test('Should return a Note with no date scheduled', () => {
  const note = new Note(noScheduled);

  expect(note.category).toBe("Category");
  expect(note.dateScheduled).toBe(null);
  expect(note.raw).toBe(noScheduled);
  expect(note.text).toBe("This is an important note with a category and scheduled date");
  expect(note.type).toBe("Idea");

});

test('Should return a Note with no category, type or date scheduled', () => {
  const note = new Note(noCategoryOrTypeOrDate);

  expect(note.category).toBe("");
  expect(note.dateScheduled).toBe(null);
  expect(note.raw).toBe(noCategoryOrTypeOrDate);
  expect(note.text).toBe("This is an important note with no category type or scheduled date.");
  expect(note.type).toBe("Default");

});

