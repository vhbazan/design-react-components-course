const Speaker = ({id, firstName, lastName, isFavorite, bio}) => {
    return (
        <div className="rounded overflow-hidden shadow-lg p-6" key={id}>
                  <div className="grid grid-cols-4 mb-6">
                    <div className="font-bold text-lg col-span-3">
                      {`${firstName} ${lastName}`}
                    </div>
                    <div className="flex justify-end">
                      <div className={ isFavorite ? 'heartedbutton' : 'heartdarkbutton'}></div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <img src={`/speakers/Speaker-${id}.jpg`} alt={`${firstName} ${lastName}`}  />
                  </div>
                  <div className="text-gray-600">
                    {bio.substr(0, 70) + '... '}
                  </div>
                </div>
    )
};

export default Speaker;