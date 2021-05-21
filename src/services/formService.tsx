import axios from 'axios'
import { config } from '../config';
import { auth } from '../firebase';

export const postEmployeeEnrollmentForm = async (enrollmentForm: any) => {
    if (!enrollmentForm) return null;
    const token = await auth.currentUser?.getIdToken();
    debugger;
    try {
      const res = await axios.post(
        config.apiUrl + '/api/user/enrollment-form', enrollmentForm,  {
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