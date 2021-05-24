import axios from 'axios'
import { config } from '../config';
import { auth } from '../firebase';

export const getMatches = async () => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const res = await axios.get(
      config.apiUrl + '/api/match',
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

export const answerMatch = async (id:string, state:string) => {//, jobId:string) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const res = await axios.put(
      config.apiUrl + '/api/match/' + id,
      {
        state,
        //jobId
      },
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
