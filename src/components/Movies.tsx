
import React, { useState } from 'react';
import Banner from './Banner.tsx';
import DarkKnight from './assets/darkknight.jpeg';
import Inception from './assets/inception.jpeg';
import PulpFiction from './assets/pulpfiction.webp';
import Shawshank from './assets/shawshank.jpg';
import ForrestGump from './assets/forrestgump.jpeg';
import Godfather from './assets/godfather.jpeg';

interface MovieSelectorProps {
  onNext: () => void;
  onBack: () => void;
}

const MovieSelector: React.FC<MovieSelectorProps> = ({ onNext, onBack }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [progress, setProgress] = useState<number>(4);
  const [selectedMovies, setSelectedMovies] = useState<number[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<{ id: number; title: string; coverArt: string } | null>(null);

  const movieList = [
    { id: 1, title: 'Inception', coverArt: Inception },
    { id: 2, title: 'The Shawshank Redemption', coverArt: Shawshank },
    { id: 3, title: 'The Dark Knight', coverArt: DarkKnight },
    { id: 4, title: 'Pulp Fiction', coverArt: PulpFiction },
    { id: 5, title: 'The Godfather', coverArt: Godfather },
    { id: 6, title: 'Forrest Gump', coverArt: ForrestGump },
  ];

  const handleMovieToggle = (id: number) => {
    const isSelected = selectedMovies.includes(id);
    setSelectedMovies((prevSelectedMovies) =>
      isSelected
        ? prevSelectedMovies.filter((movieId) => movieId !== id)
        : [...prevSelectedMovies, id]
    );
    setSelectedMovie(movieList.find((movie) => movie.id === id) || null);
  };

  const handleNext = () => {
    console.log('Next button clicked with selected movies:', selectedMovies);
    onNext();
  };

  const handleBack = () => {
    onBack();
  };

  const filteredMovies = movieList.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-10">
      <div className="relative h-6 rounded-full overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500 shadow-md">
        <div
          className="absolute left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all ease-in-out duration-300"
          style={{ width: `${(progress / 5) * 100}%` }}
        ></div>
      </div>

      <h1 className="text-4xl">
        Select your top 5 movies
      </h1>
      <p className="text-gray-500 text-lg whitespace-normal max-w-[41rem] mx-auto">
        Selecting your top 5 movies will enable us to suggest like-minded users and nearby communities for exciting watch parties and movie premiere gatherings.
      </p>

      <div>
        <input
          type="text"
          placeholder="Search movies..."
          className="border border-neutral-700 text-white p-1 rounded bg-neutral-700 text-xl w-7/12 px-4 py-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Movies you might like</h2>
        <div className="flex justify-center space-x-4">
          {filteredMovies.map((movie) => (
            <button
              key={movie.id}
              className={`text-white focus:outline-none flex flex-col items-center`}
              onClick={() => handleMovieToggle(movie.id)}
            >
              <img src={movie.coverArt} alt={movie.title} className="mb-2" style={{ width: '130px', height: '192px' }} />
              <p className="text-sm">{movie.title}</p>
              <span className="mr-2">
                {selectedMovies.includes(movie.id) ? '✔' : ''}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Banner
        selectedItems={selectedMovies}
        onBack={handleBack}
        onNext={handleNext}
        itemList={movieList}
        defaultEmptyBox={'url/to/empty-box.png'}
      />
    </div>
  );
};

export default MovieSelector;
