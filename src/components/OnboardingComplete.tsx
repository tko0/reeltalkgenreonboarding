import React from 'react';

const OnboardingComplete: React.FC = () => {
  return (
    <div className="p-8 space-y-12 text-center">
      <h1 className="text-4xl font-bold">Onboarding Complete</h1>
      <p className="text-gray-500">Congratulations! You're all set.</p>
      <p className="text-green-500 text-3xl animate-bounce">🎉</p>
    </div>
  );
};

export default OnboardingComplete;
