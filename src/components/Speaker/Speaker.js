import SpeakerFavoriteButton from './SpeakerFavoriteButton';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import SpeakerImage from './SpeakerImage';
import React from 'react'


const SpeakerComponent = ({id, firstName, lastName, isFavorite, bio, onFavoriteToggle, showErrorCard}) => {
    if(showErrorCard) {
        return (
            <div className="rounded overflow-hidden shadow-lg p-6 bg-white">
        <div className="grid grid-cols-4 mb-6">
          <div className="font-bold text-lg col-span-3">
            Error Showing Speaker
          </div>
        </div>
        <div className="mb-6">
          <img src="/speakersimages/dummy-speaker-image.jpg" />
          
        </div>
        <div>Contact site owner for resolution.</div>
      </div>
        );
    }
    
    return (
        <div className="rounded overflow-hidden shadow-lg p-6 bg-white" key={id}>
            <div className="grid grid-cols-4 mb-6">
            <div className="font-bold text-lg col-span-3">
                {`${firstName} ${lastName}`}
            </div>
            <div className="flex justify-end">
               {isFavorite} 
                <SpeakerFavoriteButton isFavorite={isFavorite}
                    onFavoriteToggle={onFavoriteToggle}></SpeakerFavoriteButton>
            </div>
            </div>
            <div className="mb-6">
                <SpeakerImage  id={id} key={id} />
            </div>
            <div className="text-gray-600">
                {bio.substr(0, 70) + '... '}
            </div>
        </div>
    )
};


const Speaker = React.memo((props) => {
  return (
    <ErrorBoundary errorUI={<SpeakerComponent showErrorCard={true}></SpeakerComponent>}>
      <SpeakerComponent {...props}>
      </SpeakerComponent>
    </ErrorBoundary>
  )
})


export default Speaker;