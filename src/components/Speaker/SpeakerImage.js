import { SimpleImg } from 'react-simple-img';

const SpeakerImage = ({id, firstName, lastName}) => {

    return (
        <SimpleImg src={`/speakersimages/Speaker-${id}.jpg`}
            animationDuration="1"
            width={200}
            height={200}
            applyAspectRatio="true"
            />
    )
};

export default SpeakerImage;