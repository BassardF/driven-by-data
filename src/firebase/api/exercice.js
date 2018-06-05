import db from '../firestore';

const PATHS = ['sportsdata', 'exercices', 'singleKey'];

export const on = (sport, callback) =>
  db
    .collection(PATHS[0])
    .doc(sport)
    .collection(PATHS[1])
    .doc(PATHS[2])
    .onSnapshot(doc => {
      if (doc && callback) {
        const data = doc.data();
        if (data && data.exercices) callback(data);
      }
    });

export const setExercices = (sport, exercices) =>
  db
    .collection(PATHS[0])
    .doc(sport)
    .collection(PATHS[1])
    .doc(PATHS[2])
    .set({
      exercices,
    });
