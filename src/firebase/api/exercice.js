import db from '../firestore';

const PATHS = ['sportsdata', 'exercices'];

export const on = (sport, callback) =>
  db
    .collection(PATHS[0])
    .doc(sport)
    .onSnapshot(doc => {
      if (doc) {
        console.log('Current data: ', { id: doc.id, ...doc.data() });
        callback({ id: doc.id, ...doc.data() });
      }
    });

export const addExercice = name =>
  db.collection(PATHS[0]).add({
    name,
  });
