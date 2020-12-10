
import {
    GET_ALL_SUCCESS,
    GET_ALL_FAILURE,
    PUT_SUCCESS,
    PUT_FAILURE
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
        break;
        case GET_ALL_FAILURE:
        return {
            ...state,
            status: REQUEST_STATUS.ERROR,
            error: action.error
        }
      case PUT_SUCCESS:
          const { records } = state;
          const { record } = action;
          const recordIndex = records.map((rec) => rec.id ).indexOf(record.id);
        return {
          ...state,
          records: [
            ...records.slice(0, recordIndex),
            record,
            ...records.slice(recordIndex + 1)
          ]
        }
        break;
    case PUT_FAILURE:
        console.log('PUT FAILURE');
        return {
          ...state,
          error: action.error
        }
        break;
      default:
        return state;
      break;
    }
    
  };