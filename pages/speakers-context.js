import React, { useContext } from 'react';
import { SpeakersContext, SpeakersProvider } from '../src/contexts/SpeakersContext';

const SpeakersComponent = () => {
  const speakers = useContext(SpeakersContext);

  return (
    <div>
      {speaker.map(({imgSrc, name}) =>{
        return <img src={`/images/${imgSrc}`} alt={name} key={imgSrc} />
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