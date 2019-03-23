# ShortHand

A simple note taking app that uses conventions for organizing content.

## Conventions

By default there are several conventions to help you organize your content.

### Categories

- Anything before the first comma will categorize the note

### Types

- A note ending in a ? will be typed as a question and color coded accordingly
- A note ending in a . will be typed as information and will be color coded accordingly
- A note ending in a ! will be typed as an important note
- A note ending in a \* will be typed as an idea
- A note ending in | will be typed as a todo - todo's can also be scheduled (see Dates)
- A note ending in a , will create a category

### Dates

- Each note will be time stamped when it is entered
- If a note is typed as a todo you can enter a date after to schedule that todo. You can enter a date as either 2, 4, 6, 8 numbers.
  - 1 number uses the format d and defaults to the current month
  - 2 numbers uses format dd and defaults to the current month
  - 4 numbers uses format mmdd and will default to the current year
  - 6 numbers uses format mmddyy and will default to 20yy
  - 8 numbers uses format mmddyyyy

## How To Use

The following is how to setup a local copy of this app on windows.

Make sure you have Node and NPM installed on your system.

Clone this repository locally on your system.

run `npm install` in a terminal window.

run `npm run dev' to deploy the app in development mode.

# TODO/IDEAS

- random placeholder text in new note form (Write something... What do you want to record? etc.)
- sub-categories based on multiple commas or >
- Add a "press enter to submit" checkbox for adding multiple short notes.
- Add a list mode, where every item gets added to a list within the category specified (or not) in the first item. You can also start an item with - to begin list mode
- let actions follow along as you scroll. Basically fix them to the top of the scroll for long notes.
- Parts dissolve into their places as the are entered. backspacing puts the word back and subtracts a character from raw