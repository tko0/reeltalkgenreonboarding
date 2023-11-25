import React, { useState } from 'react';
import Banner from './Banner.tsx';
import BreakingBad from './assets/breakingbad.webp';
import StrangerThings from './assets/strangerthings.jpeg';
import GOT from './assets/got.jpg';
import Mandalorian from './assets/mandalorian.jpeg';
import Friends from './assets/friends.jpeg';
import Witcher from './assets/witcher.jpeg';

interface TVShowSelectorProps {
  onNext: () => void;
  onBack: () => void;
}

const TVShowSelector: React.FC<TVShowSelectorProps> = ({ onNext, onBack }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [progress, setProgress] = useState<number>(5);
  const [selectedTVShows, setSelectedTVShows] = useState<number[]>([]);
  const [selectedTVShow, setSelectedTVShow] = useState<{ id: number; title: string; coverArt: string } | null>(null);

  const tvShowList = [
    { id: 1, title: 'Breaking Bad', coverArt: BreakingBad },
    { id: 2, title: 'Stranger Things', coverArt: StrangerThings },
    { id: 3, title: 'Game of Thrones', coverArt: GOT },
    { id: 4, title: 'The Mandalorian', coverArt: Mandalorian },
    { id: 5, title: 'Friends', coverArt: Friends },
    { id: 6, title: 'The Witcher', coverArt: Witcher },
  ];

  const handleTVShowToggle = (id: number) => {
    const isSelected = selectedTVShows.includes(id);
    setSelectedTVShows((prevSelectedTVShows) =>
      isSelected
        ? prevSelectedTVShows.filter((tvShowId) => tvShowId !== id)
        : [...prevSelectedTVShows, id]
    );
  };

  const handleNext = () => {
    console.log('Next button clicked with selected TV shows:', selectedTVShows);
    setSelectedTVShow(tvShowList.find((tvShow) => tvShow.id === selectedTVShows[0]) || null);
    onNext();
  };

  return (
    <div className="p-8 space-y-10">
      <div className="relative h-6 rounded-full overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500 shadow-md">
        <div
          className="absolute left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all ease-in-out duration-300"
          style={{ width: `${(progress / 5) * 100}%` }}
        ></div>
      </div>

      <h1 className="text-4xl">
        Select your top 5 TV shows
      </h1>

      <p className="text-gray-500 text-lg whitespace-normal max-w-[41rem] mx-auto">
        Selecting your top 5 TV shows will enable us to suggest like-minded users and nearby communities for exciting watch parties and TV show premiere gatherings.
      </p>

      <div>
        <input
          type="text"
          placeholder="Search TV shows..."
          className="border border-neutral-700 text-white p-1 rounded bg-neutral-700 text-xl w-7/12 px-4 py-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">TV Shows you might like</h2>
        <div className="flex justify-center space-x-4">
          {tvShowList
            .filter((tvShow) =>
              tvShow.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((tvShow) => (
              <button
                key={tvShow.id}
                className={`text-white focus:outline-none`}
                onClick={() => handleTVShowToggle(tvShow.id)}
              >
                <img src={tvShow.coverArt} alt={tvShow.title} className="mb-2" style={{ width: '130px', height: '192px' }} />
                <p className="text-sm">{tvShow.title}</p>
                <span className="mr-2">
                  {selectedTVShows.includes(tvShow.id) ? '✔' : ''}
                </span>
              </button>
            ))}
        </div>
      </div>

      <Banner
        selectedItems={selectedTVShows}
        onBack={onBack}
        onNext={handleNext}
        itemList={tvShowList}
        defaultEmptyBox={'url/to/empty-box.png'}
      />
    </div>
  );
};

export default TVShowSelector;
