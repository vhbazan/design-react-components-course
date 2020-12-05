import React from 'react';

import withData from './withData';


function SpeakersRenderProps(props) {
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

  return props.children({
    speakers: speakers
  });
}

const Speakers = ({speakers}) => {
  
  return (
    <SpeakersRenderProps>
      {() => {
        
        return (
          
          <div>
          { speakers.map(( {name, imageSrc}) => {
              return <img src={`images/${imageSrc}.png`} alt={name} key={imageSrc}></img>
            }
          )};
          </div>
      )
    }}
  </SpeakersRenderProps>
  );
};

export default withData(Speakers);
