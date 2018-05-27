import db from '../firestore';

const PATH = 'sports';

export const fetchSports = async () => {
  const snapshots = await db.collection(PATH).get();
  const sports = [];
  snapshots.forEach(doc => {
    sports.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return sports;
};

export const addSport = name =>
  db.collection(PATH).add({
    name,
  });
