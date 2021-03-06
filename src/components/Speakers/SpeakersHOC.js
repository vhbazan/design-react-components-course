import React, { useState } from 'react';
import { compose } from 'recompose';
import SpeakerSearchBar from './SpeakerSearchBar';
import Speaker from '../Speaker/Speaker';

import { REQUEST_STATUS } from '../../reducers/reducers';
import withRequest from '../HOCs/withRequest';
import withSpecialMessage from '../HOCs/withSpecialMessage';

const Speakers = ({records: speakers,
                  status,
                  error,
                  put,
                  bgColor,
                specialMessage }) => {

  const [searchQuery, setSearchQuery] = useState("");

  
  async function onFavoriteToggleHandler(speakerRec) {
    put({
      ...speakerRec,
      isFavorite: !speakerRec.isFavorite
    })    
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
          
          <div className={bgColor}>
            <SpeakerSearchBar searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            ></SpeakerSearchBar>
            {specialMessage && specialMessage.length > 0 && (
              <div className="bg-orange-100 border-l-8 border-orange-500 text-orange-700 p-4 text-bold"
                role="alert">
                  <p className="font-bold">Special Message</p>
                  <p> {specialMessage} </p>

              </div>
            )}
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

export default compose(
  withRequest('http://localhost:4000', 'speakers'),
  withSpecialMessage())(Speakers);
