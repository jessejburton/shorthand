import database from '../firebase/firebase';
import uuid from 'uuid';

// ADD_NOTE
export const addNote = (note) => ({
  type: 'ADD_NOTE',
  note
});

export const startAddNote = (noteData = {}) => {
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;

    const {
      raw = '',
      dateEntered = 0,
      category = '',
      text = '',
      dateScheduled = 0,
      type = ''
    } = noteData;
    const note = { raw, dateEntered, category, text, dateScheduled, type };

    console.log(note);

    dispatch(
      addNote({
        id: uuid.v4(),
        ...note
      })
    );

    /*
    return database
      .ref(`users/${uid}/expenses`)
      .push(expense)
      .then((ref) => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense
          })
        );
      });
      */
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

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database
      .ref(`users/${uid}/expenses`)
      .once('value')
      .then((snapshot) => {
        const expenses = [];

        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });

        dispatch(setExpenses(expenses));
      });
  };
};
