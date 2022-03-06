import axios from 'axios';
const baseUrl = '/api/users';

const getAll = async (token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

export default { getAll };
