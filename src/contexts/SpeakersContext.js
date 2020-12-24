import React, {  createContext } from 'react';

const SpeakerContext = createContext();

const SpeakerProvider = ({children}) => {
    const speakers = [
        {
          imageSrc: 'speaker-component-1124',
          name: 'Douglas Crockford',
        },
        {
          imageSrc: 'speaker-component-1530',
          name: 'Tamara Baker',
        },
        {
          imageSrc: 'speaker-component-10803',
          name: 'Eugene Chuvyrov',
        },
      ];

      return (
        <SpeakerContext.Provider value={speakers}>
            {children}
        </SpeakerContext.Provider>
      );

      export { SpeakerContext, SpeakerProvider};
}