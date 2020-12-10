import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

import SpeakerSearchBar from './SpeakerSearchBar';
import Speaker from '../Speaker/Speaker';
import {
  GET_ALL_FAILURE, GET_ALL_SUCCESS, PUT_FAILURE, PUT_SUCCESS
  } from '../../actions/request';
  import {requestReducer, REQUEST_STATUS } from '../../reducers/reducers';
import withRequest from '../HOCs/withRequest';

  const Speakers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const [{ records: speakers, status, error }, dispatch] = useReducer(requestReducer, {
    status: REQUEST_STATUS.LOADING,
    records: [],
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await axios.get('http://localhost:4000/speakers');
      //loading??? 
      dispatch({
        records: response.data,
        type: GET_ALL_SUCCESS
      });
    } catch(e) {
      dispatch({
        type: GET_ALL_FAILURE,
        error: e
      });
    }
    }
    fetchData();
  }, [status]);

  
  async function onFavoriteToggleHandler(speaker) {
    console.log('onFavoriteToggleHandler clicked , ' )
    const updatedSpeaker = toggleSpeakerFavorite(speaker);
    const speakerIndex = speakers.map((speakerRec) => speakerRec.id).indexOf(speaker.id);
    try {
      await axios.put(`http://localhost:4000/speakers/${speaker.id}`, updatedSpeaker)
      dispatch({
        type: PUT_SUCCESS,
        record: updatedSpeaker
      });
    } catch (e) {
      dispatch({
        type: PUT_FAILURE,
        error: e
      });
    }
    
  }

  function toggleSpeakerFavorite(speaker) {
    return {
      ...speaker,
      isFavorite: !speaker.isFavorite
    }
  }

  const isLoading = status === REQUEST_STATUS.LOADING;
  const success = status === REQUEST_STATUS.SUCCESS;
  const hasErrored = status === REQUEST_STATUS.ERROR;

  return (
          
          <div>
            <SpeakerSearchBar searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            ></SpeakerSearchBar>
            {isLoading && <div>Loading ... </div> }
            {hasErrored && <div>
              Loading error ... Is the json-server running? 
              <br/>
              <b>ERROR: {error.message} </b>
            </div> }
            {success && (<div className="grid md:grid-cols-2 lg:grid-col-3 grid-cols-1 gap-12">
              {speakers
                .filter((item)=> {
                  const targetString = `${item.firstName} ${item.lastName}`.toLowerCase();
                  return searchQuery.length === 0 ? true : targetString.includes(searchQuery.toLowerCase());
                })
                .map( (speaker) => {
                  console.log('speaker' + JSON.stringify(speaker));
                return <Speaker key={speaker.id} {...speaker} onFavoriteToggle={() => onFavoriteToggleHandler(speaker)}></Speaker>
                } 
              
              )}
            </div>)}
          
          </div>
      )
   
};

export default withRequest()(Speakers);
