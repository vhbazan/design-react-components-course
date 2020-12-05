const SpeakerFavoriteButton = ({isFavorite}) => {

    return (
        <div className={ isFavorite ? 'heartedbutton' : 'heartdarkbutton'}></div>
    )
};

export default SpeakerFavoriteButton;