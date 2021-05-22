import axios from 'axios'
import { config } from '../config';
import { auth } from '../firebase';

export const getMatches = async () => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const res = await axios.get(
      config.apiUrl + '/api/matches',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
