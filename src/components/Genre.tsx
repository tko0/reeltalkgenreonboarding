import React, { useState } from 'react';

interface GenreSelectorProps {
  onNext: (selectedGenres: string[]) => void;
  currentStep: number;
}

const genres = [
  'Action', 'Adventure', 'Adult', 'Animation', 'Biography', 'Bollywood',
  'Comedy', 'Crime', 'Disaster', 'Documentary', 'Drama', 'Family', 'Fantasy',
  'Film Noir', 'History', 'Horror', 'Game-Show', 'Independent', 'International',
  'Music', 'Musical', 'Mystery', 'News', 'Reality-TV', 'Romance', 'Rom-Com',
  'Sci-Fi', 'Talk-Show', 'Short', 'Sport', 'Thriller', 'War', 'Western'
];

const defaultGenres = genres.slice(0, 20);

const GenreSelector: React.FC<GenreSelectorProps> = ({ onNext, currentStep }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [showAllGenres, setShowAllGenres] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [progress, setProgress] = useState<number>(3);

  const totalSteps = 5;

  const handleGenreToggle = (genre: string) => {
    const isSelected = selectedGenres.includes(genre);
    setSelectedGenres((prevSelectedGenres) =>
      isSelected
        ? prevSelectedGenres.filter((g) => g !== genre)
        : [...prevSelectedGenres, genre]
    );
  };

  const handleShowMore = () => {
    setShowAllGenres(true);
  };

  const handleNext = () => {
    if (selectedGenres.length === 5) {
      console.log('Next button clicked with selected genres:', selectedGenres);
      onNext(selectedGenres);
    }
  };

  const filteredGenres = showAllGenres
    ? genres.filter((genre) => genre.toLowerCase().includes(searchTerm.toLowerCase()))
    : defaultGenres.filter((genre) => genre.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-8 space-y-12">
      <div className="relative h-6 rounded-full overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500 shadow-md">
        <div
          className="absolute left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all ease-in-out duration-300"
          style={{ width: `${(progress / 5) * 100}%` }}
        ></div>
      </div>

      <h1 className="text-4xl">
        Select your top 5 genres for movies and TV
      </h1>

      <div>
        <input
          type="text"
          placeholder="Search genres..."
          className="border border-neutral-700 text-white p-1 rounded bg-neutral-700 text-xl w-7/12 px-4 py-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showAllGenres ? (
        <div className="grid grid-cols-5 gap-4">
          {filteredGenres.map((genre) => (
            <button
              key={genre}
              className={`bg-white text-black rounded p-2 ${
                selectedGenres.includes(genre) ? 'ring-2 ring-blue-300' : ''
              }`}
              onClick={() => handleGenreToggle(genre)}
            >
              <span className="mr-2">
                {selectedGenres.includes(genre) ? '✔' : ''}
              </span>
              <span role="img" aria-label="icon" className="mr-1">
                🎬
              </span>
              {genre}
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {filteredGenres.map((genre, index) => (
            <button
              key={genre}
              className={`bg-white text-black rounded p-2 ${
                selectedGenres.includes(genre) ? 'ring-2 ring-blue-300' : ''
              }`}
              onClick={() => handleGenreToggle(genre)}
            >
              <span className="mr-2">
                {selectedGenres.includes(genre) ? '✔' : ''}
              </span>
              <span role="img" aria-label="icon" className="mr-1">
                🎬
              </span>
              {genre}
            </button>
          ))}
          {defaultGenres.length % 4 === 0 && (
            <div className="flex justify-center col-span-5 mt-4">
              <p onClick={handleShowMore} className="text-gray-500 cursor-pointer text-base">
                Show More
              </p>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center">
        <button className="w-1/4 border border-white text-white rounded p-1 text-lg">
          Back
        </button>
        <div className="w-1/12"></div>
        <button
          onClick={handleNext}
          disabled={selectedGenres.length !== 5}
          className={`w-1/4 text-lg ${
            selectedGenres.length === 5
              ? 'border border-white text-white'
              : 'bg-gray-400'
          } rounded p-1`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GenreSelector;
