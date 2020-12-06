import React, { useState, useEffect } from 'react';

import SpeakerSearchBar from './SpeakerSearchBar';
import Speaker from '../Speaker/Speaker';
import axios from 'axios';

const Speakers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:4000/speakers');
      setSpeakers(response.data);
    }
    fetchData();
  }, []);

  
  async function onFavoriteToggleHandler(speaker) {
    console.log('onFavoriteToggleHandler clicked , ' )
    const updatedSpeaker = toggleSpeakerFavorite(speaker);
    const speakerIndex = speakers.map((speakerRec) => speakerRec.id).indexOf(speaker.id);
    await axios.put(`http://localhost:4000/speakers/${speaker.id}`, updatedSpeaker)
    setSpeakers([
      ...speakers.slice(0, speakerIndex), updatedSpeaker, ...speakers.slice(speakerIndex+1)
    ])
  }

  function toggleSpeakerFavorite(speaker) {
    return {
      ...speaker,
      isFavorite: !speaker.isFavorite
    }
  }

  return (
          
          <div>
            <SpeakerSearchBar searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            ></SpeakerSearchBar>
            <div className="grid md:grid-cols-2 lg:grid-col-3 grid-cols-1 gap-12">
              {speakers
                .filter((item)=> {
                  const targetString = `${item.firstName} ${item.lastName}`.toLowerCase();
                  return searchQuery.length === 0 ? true : targetString.includes(searchQuery.toLowerCase());
                })
                .map( (speaker) => (
                <Speaker key={speaker.id} {...speaker} onFavoriteToggle={() => onFavoriteToggleHandler(speaker)}></Speaker>
              ))}
            </div>
          </div>
      )
   
};

export default Speakers;
