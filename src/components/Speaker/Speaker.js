import SpeakerFavoriteButton from './SpeakerFavoriteButton';
import SpeakerImage from './SpeakerImage';

const Speaker = ({id, firstName, lastName, isFavorite, bio, onFavoriteToggle}) => {
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

export default Speaker;