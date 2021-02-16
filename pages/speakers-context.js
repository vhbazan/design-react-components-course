import React, { useContext } from 'react';
import { SpeakersContext, SpeakersProvider } from '../src/contexts/SpeakersContext';

const SpeakersComponent = () => {
  const speakers = useContext(SpeakersContext);

  return (
    <div>
      {speakers.map(({imgSrc, name}) =>{
        return <img src={`/speakersimages/${imgSrc}`} alt={name} key={imgSrc} />
      } )}
    </div>
  );
};

const Speakers = () => {

  return (
    <SpeakersProvider>
      <SpeakersComponent></SpeakersComponent>
    </SpeakersProvider>
  )
}

export default Speakers;