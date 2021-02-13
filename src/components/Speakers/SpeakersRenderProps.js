import React, { useState } from 'react';
import { compose } from 'recompose';
import SpeakerSearchBar from './SpeakerSearchBar';
import Speaker from '../Speaker/Speaker';

import { REQUEST_STATUS } from '../../reducers/reducers';
import withRequest from '../HOCs/withRequest';
import withSpecialMessage from '../HOCs/withSpecialMessage';
import SpecialMessageRenderProps from '../RPs/SpecialMessageRenderProps';
import Request from '../RPs/Request';

const Speakers = ({
  bgColor
}) => {

  const [searchQuery, setSearchQuery] = useState("");

  return (
          
          <div className={bgColor}>
            <SpeakerSearchBar searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            ></SpeakerSearchBar>
            <>
            <SpecialMessageRenderProps>
              {({specialMessage }) => {
           return (
              <Request baseUrl="http://localhost:4000" routeName="speakers">
              {({ records: speakers, status, error, put }) => {
                const onFavoriteToggleHandler = async (speakerRec) => {
                  put({
                    ...speakerRec,
                    isFavorite: !speakerRec.isFavorite
                  });  
                };
                const isLoading = status === REQUEST_STATUS.LOADING;
                const success = status === REQUEST_STATUS.SUCCESS;
                const hasErrored = status === REQUEST_STATUS.ERROR;

                return (
                  <>
                   {specialMessage && specialMessage.length > 0 && (
                        <div
                          className="bg-orange-100 border-l-8 border-orange-500 text-orange-700 p-4 text-2xl"
                          role="alert"
                        >
                          <p className="font-bold">Special Message</p>
                          <p>{specialMessage}</p>
                        </div>
                      )}
                      {isLoading && <div>Loading ... </div> }
                      {hasErrored && (<div>
                        Loading error ... Is the json-server running? 
                        <br/>
                        <b>ERROR: {error.message} </b>
                      </div>)}
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
                    </div>
                    )}
                  </>
                );
              }
            }           
            </Request>
            );
          }}
          </SpecialMessageRenderProps>
        </>
      </div>
    )
  };

export default Speakers;
