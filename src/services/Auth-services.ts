import axios from 'axios';

export const Register = async (body: any) => {
  const url = import.meta.env.BACKEND_URL;
  try {
    await axios.post(url + '/register', body);
    return;
  } catch (error) {
    return error;
  }
};
