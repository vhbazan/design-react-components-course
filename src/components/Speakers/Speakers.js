import React, { useState, useEffect, useReducer } from 'react';

import SpeakerSearchBar from './SpeakerSearchBar';
import Speaker from '../Speaker/Speaker';
import axios from 'axios';

const Speakers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const REQUEST_STATUS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
  };

  const reducer = (state, action) => {
    console.log('type', action.type);
    switch (action.type) {
      case 'GET_ALL_SUCCESS':
        return {
          ...state,
          speakers: action.speakers
        };
        break;
      case 'UPDATE_STATUS':
        return {
          ...state,
          status: action.status
        }
      break;
      default:

      break;
    }
    
  };
  const [{ speakers, status }, setSpeakers] = useReducer(reducer, []);

  const [error, setError] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await axios.get('http://localhost:4000/speakers');
      //loading??? 
      setSpeakers({
        speakers: response.data,
        type: 'GET_ALL_SUCCESS'
      });
      setSpeakers({
        type: 'UPDATE_STATUS',
        status: REQUEST_STATUS.SUCCESS
      });
    } catch(e) {
      setSpeakers({
        type: 'UPDATE_STATUS',
        status: REQUEST_STATUS.ERROR
      });
      setError(e);
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
      setSpeakers([
        ...speakers.slice(0, speakerIndex), updatedSpeaker, ...speakers.slice(speakerIndex+1)
      ]);
    } catch (e) {
      setSpeakers({
        type: 'UPDATE_STATUS',
        status: REQUEST_STATUS.ERROR
      });
      setError(e);
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
                .map( (speaker) => (
                <Speaker key={speaker.id} {...speaker} onFavoriteToggle={() => onFavoriteToggleHandler(speaker)}></Speaker>
              ))}
            </div>)}
          
          </div>
      )
   
};

export default Speakers;
