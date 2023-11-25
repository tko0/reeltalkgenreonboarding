import React from 'react';

interface BannerProps<T> {
  selectedItems: T[];
  itemList: { id: number; title: string; coverArt: string }[];
  onBack: () => void;
  onNext: () => void;
  defaultEmptyBox: string;
}

const Banner: React.FC<BannerProps<{ id: number; title: string; coverArt: string }>> = ({
  selectedItems,
  itemList,
  onBack,
  onNext,
  defaultEmptyBox,
}) => {
  const renderBannerImage = (itemId: number | null, index: number) => {
    if (itemId !== null) {
      const selectedItem = itemList.find((item) => item.id === itemId);
      return (
        <img
          key={index}
          src={selectedItem?.coverArt}
          alt={selectedItem?.title}
          className="banner-image"
          style={{ width: '65px', height: '86px' }}
        />
      );
    } else {
      return <img key={index} src={defaultEmptyBox} alt={`Empty Box ${index + 1}`} className="banner-image" />;
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-transparent to-black p-4">
      <div className="bg-transparent p-8 rounded-t-md flex items-center justify-center space-x-8">
        <div className="banner-content">
          <h2 className="text-xl mb-2">Your top 5 selections:</h2>
          <div className="banner-images flex space-x-2">
            {[...Array(5)].map((_, index) => (
              renderBannerImage(selectedItems[index], index)
            ))}
          </div>
        </div>
        <div className="banner-buttons flex flex-col">
          <button
            onClick={onBack}
            className="border border-white text-white rounded px-4 py-2 text-lg mb-2"
          >
            Back
          </button>
          <button onClick={onNext} className="border border-white text-white rounded px-4 py-2 text-lg">
            {selectedItems.some((item) => item !== null) ? 'Next' : 'Skip'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
