import React from 'react';
import { Component } from 'react';
import withData from './withData';

const Speakers = ({speakers}) => {
  

return (
  <div>
  {speakers.map(( {name, imageSrc}) => {
      return <img src={`images/${imageSrc}.png`} alt={name} key={imageSrc}></img>
    }
  )};
  </div>
)
};

export default withData(Speakers);
