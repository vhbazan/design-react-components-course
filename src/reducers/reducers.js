
import {
    GET_ALL_SUCCESS,
    GET_ALL_FAILURE,
    PUT_SUCCESS,
    PUT_FAILURE,
    PUT
} from '../actions/request';

  export const REQUEST_STATUS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
  };

  export const requestReducer = (state, action) => {
    console.log('type', action.type);
    switch (action.type) {
      case GET_ALL_SUCCESS:
        return {
          ...state,
          status: REQUEST_STATUS.SUCCESS,
          records: action.records
        };
        case GET_ALL_FAILURE:
        return {
            ...state,
            status: REQUEST_STATUS.ERROR,
            error: action.error
        }
      case PUT:
        console.log('PUT ');
          const { records } = state;
          const { record } = action;
          const recordIndex = records.map((rec) => rec.id ).indexOf(record.id);
        return {
          ...state,
          prevRecords: state.records,
          records: [
            ...records.slice(0, recordIndex),
            record,
            ...records.slice(recordIndex + 1)
          ]
        }
    case PUT_FAILURE:
        console.log('PUT FAILURE');
        return {
          ...state,
          records: state.prevRecords,
          error: action.error
        }
        case PUT_SUCCESS:
          console.log('PUT SUCCESS');
          return state;
      default:
        return state;
    }
    
  };