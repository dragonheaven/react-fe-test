import * as types from './types';
import { fetchReports } from './api';

const requestGetReports = () => ({
  type: types.GET_REPORTS,
});

const requestGetReportsSuccess = (data) => ({
  type: types.GET_REPORTS_SUCCESS,
  data,
});

const requestGetReportsError = (errors) => ({
  type: types.GET_REPORTS_ERROR,
  errors,
});

export const getReports = () => async (dispatch) => {
  try {
    dispatch(requestGetReports());
    const { data } = await fetchReports();
    dispatch(requestGetReportsSuccess(data));
    return data;
  } catch (error) {
    const { response: { data: { message }, status, statusText } } = error;
    const errMessage = message || `${status} - ${statusText}`;
    dispatch(requestGetReportsError(errMessage));
    return error.response;
  }
};

export const updateReport = (id, obj) => ({
  type: types.UPDATE_REPORT,
  id,
  obj,
});

export const updateSocial = (id, obj) => ({
  type: types.UPDATE_SOCIAL,
  id,
  obj,
});
