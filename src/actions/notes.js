import database from '../firebase/firebase';
import uuid from 'uuid';

// ADD_NOTE
export const addNote = (note) => ({
  type: 'ADD_NOTE',
  note
});

export const startAddNote = (noteData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    const {
      raw = '',
      dateEntered = 0,
      category = '',
      text = '',
      dateScheduled = 0,
      type = ''
    } = noteData;
    const id = uuid.v4();
    const note = { id, raw, dateEntered, category, text, dateScheduled, type };

    /* LOCALSTORAGE . start */
    const notes = [
      note,
      ...getState().notes
    ]

    localStorage.setItem('notes', JSON.stringify(notes));
    /* LOCALSTORAGE . end */

    // Add to the database
    return database
      .ref(`notes/${uid}`)
      .push(note)
      .then(() => {
        return dispatch(
          addNote({
            ...note
          })
        );
      });

  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense({ id }));
      });
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      });
  };
};

// SET_NOTES
export const setNotes = (notes) => ({
  type: 'SET_NOTES',
  notes
});

export const startSetNotes = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    //const notes = JSON.parse(localStorage.getItem("notes")) || [];

    //return Promise.resolve(dispatch(setNotes(notes)));

    return database
      .ref(`notes/${uid}`)
      .once('value')
      .then((snapshot) => {
        const notes = [];

        snapshot.forEach((childSnapshot) => {
          notes.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });

        console.log(notes);

        dispatch(setNotes(notes));
      });
  };
};
