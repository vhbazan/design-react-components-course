import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import { GET_ALL_FAILURE, GET_ALL_SUCCESS, PUT_FAILURE, PUT_SUCCESS } from '../../actions/request';
import { requestReducer, REQUEST_STATUS } from '../../reducers/reducers';


  

const withRequest = (baseUrl, routeName) => (Component) => (props) => {

const [{ records , status, error }, dispatch] = useReducer(requestReducer, {
    status: REQUEST_STATUS.LOADING,
    records: [],
    error: null
  });

    useEffect(() => {
        const fetchData = async () => {
          try {
          const response = await axios.get(`${baseUrl}/${routeName}`);
          console.log('response', response)
          dispatch({
            records: response.data,
            type: GET_ALL_SUCCESS
          });
        } catch(e) {
            console.log('Loading data error', e);
          dispatch({
            type: GET_ALL_FAILURE,
            error: e
          });
        }
        }
        fetchData();
      }, [baseUrl, routeName]);

    const propsLocal = {
        records,
        status,
        error,
        put: async (record) => {
            try {
                await axios.put(`${baseUrl}/${routeName}/${record.id}`, record);
                dispatch({
                    type: PUT_SUCCESS,
                    record: record
                    
                })
            } catch (e) {
                dispatch({
                    type: PUT_FAILURE,
                    error: e
                })
            }
        }
    }
    return <Component {...propsLocal} {...props}></Component> ;
}

export default withRequest;