import React, { useState } from 'react';
import './App.css';
import GenreSelector from './components/Genre.tsx';
import MovieSelector from './components/Movies.tsx';
import TVShowSelector from './components/TV.tsx';
import OnboardingComplete from './components/OnboardingComplete.tsx';
import TopToolbar from './components/TopToolbar.tsx';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleGenreNext = (selectedGenres: string[]) => {
    console.log('Selected genres in App:', selectedGenres);
    handleNext();
  };

  const handleMovieNext = () => {
    console.log('Moving from movies to TV shows');
    handleNext();
  };

  const handleTVShowNext = () => {
    console.log('Onboarding complete');
    setOnboardingComplete(true);
  };

  const renderStep = () => {
    if (onboardingComplete) {
      return <OnboardingComplete />;
    }

    switch (currentStep) {
      case 1:
        return <GenreSelector onNext={handleGenreNext} currentStep={currentStep}/>;
      case 2:
        return <MovieSelector onNext={handleMovieNext} onBack={handleBack} currentStep={currentStep}/>;
      case 3:
        return <TVShowSelector onNext={handleTVShowNext} onBack={handleBack} currentStep={currentStep}/>;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <TopToolbar />
      <header className="App-header">
        {renderStep()}
      </header>
    </div>
  );
}

export default App;
