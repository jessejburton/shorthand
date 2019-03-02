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
  -- 2 numbers uses format dd and defaults to the current month
  -- 3 numbers uses format mdd
  -- 4 numbers uses format mmdd and will default to the current year
  -- 5 numbers uses format mdyy
  -- 6 numbers uses format mmddyy and will default to 20yy
  -- 8 numbers uses format mmddyyyy

## How To Use

The following is how to setup a local copy of this app on windows.

Make sure you have Node and NPM installed on your system.

Clone this repository locally on your system.

run `npm install` in a terminal window.

run `npm run dev' to deploy the app in development mode.

# IDEAS

- random placeholder text in new note form
- sub-categories based on multiple commas or >
