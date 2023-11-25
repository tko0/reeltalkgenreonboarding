import React, { useState } from 'react';
import Logo from './assets/the_reel_talk_logo.jpeg';

const TopToolbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleBrowseClick = () => {
    console.log('Browse clicked');
  };

  const handleCommunityClick = () => {
    console.log('Community clicked');
  };

  const handleDiscussionsClick = () => {
    console.log('Discussions clicked');
  };

  const handleWatchlistClick = () => {
    console.log('Watchlist clicked');
  };

  return (
    <div className="top-toolbar bg-white text-black p-4 flex items-center justify-between">
      <div className="logo-container flex items-center">
        <img src={Logo} alt="Reel Talk Logo" className="w-8 h-8 mr-2" />
        <span className="reel-talk text-2xl font-bold mr-4">Reel Talk</span>
      </div>
      <div className="nav-links flex gap-4">
        <span className="nav-link cursor-pointer" onClick={handleBrowseClick}>Browse</span>
        <span className="nav-link cursor-pointer" onClick={handleCommunityClick}>Community</span>
        <span className="nav-link cursor-pointer" onClick={handleDiscussionsClick}>Discussions</span>
      </div>
      <div className="search-bar flex-1 mx-4">
        <input type="text" placeholder="Search..." className="w-2/3 bg-gray-200 text-black border-2 border-white p-2 rounded" />
      </div>
      <div className="watchlist cursor-pointer mr-4" onClick={handleWatchlistClick}>
        <span className="font-bold">Watchlist</span>
      </div>
      <div className="profile relative cursor-pointer" onClick={handleProfileClick}>
        <div className="profile-bubble">Your Profile</div>
        {showProfileDropdown && (
          <div className="profile-dropdown absolute top-full left-0 bg-white border border-gray-300 rounded p-2 shadow-lg">
            <ul className="list-none p-0 m-0">
              <li className="cursor-pointer">Profile</li>
              <li className="cursor-pointer">Settings</li>
              <li className="cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopToolbar;
