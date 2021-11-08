import api from '../../api';

export const fetchReports = () => {
  return api.get('/reports');
};

export const createReport = (data) => {
  return api.post('/reports', data);
};
