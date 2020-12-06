import React, { useState, useEffect } from 'react';

import SpeakerSearchBar from './SpeakerSearchBar';
import Speaker from '../Speaker/Speaker';
import axios from 'axios';

const Speakers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const [speakers, setSpeakers] = useState([]);
  const REQUEST_STATUS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
  };

  const [status, setStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await axios.get('http://localhost:4000/speakers');
      //loading??? 
      setSpeakers(response.data);
      setStatus(REQUEST_STATUS.SUCCESS);
    } catch(e) {
      setStatus(REQUEST_STATUS.ERROR);
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
      setStatus(REQUEST_STATUS.ERROR);
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
