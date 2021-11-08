import * as types from './types';

const initialState = {
  isLoading: false,
  reports: [],
  social: [],
};

const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_REPORTS:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_REPORTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reports: action.data ? action.data.reports : [],
        social: action.data ? action.data.social : [],
        error: {},
      };
    case types.GET_REPORTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.errors,
      };
    case types.UPDATE_REPORT:
      return {
        ...state,
        reports: state.reports.map((report) => (report.id === action.id ? {...report, ...action.obj } : report)),
      };
    case types.UPDATE_SOCIAL:
      return {
        ...state,
        social: state.social.map((item) => (item.id === action.id ? {...item, ...action.obj } : item)),
      };
    default:
      return state;
  }
};

export default reportsReducer;
