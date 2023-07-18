import React, { useState } from 'react';

import './App.css';

const slides = [
  { title: 'Слайд 1' },
  { title: 'Слайд 2' },
  { title: 'Слайд 3' },
  { title: 'Слайд 4' },
  { title: 'Слайд 5' },
  { title: 'Слайд 6' },
];

const App = () => {
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [showModifiedImage, setShowModifiedImage] = useState(false);
  const [isBlackAndWhite, setIsBlackAndWhite] = useState(false);
  const [isInverted, setIsInverted] = useState(false);

  const handleSlideClick = (index) => {
    if (selectedSlide === index) {
      setSelectedSlide(null);
      setSelectedImage(null);
      setShowModifiedImage(false);
    } else {
      setSelectedSlide(index);
      setSelectedImage(`img/image${index + 1}.jpg`);
      setShowModifiedImage(false);
    }
  };

  const handleTopTextChange = (e) => {
    setTopText(e.target.value);
  };

  const handleBottomTextChange = (e) => {
    setBottomText(e.target.value);
  };

  const handleApplyButtonClick = () => {
    const modifiedImage = document.createElement('img');
    modifiedImage.src = selectedImage;

    const canvas = document.createElement('canvas');
    canvas.width = modifiedImage.width;
    canvas.height = modifiedImage.height;

    const context = canvas.getContext('2d');
    context.drawImage(modifiedImage, 0, 0);
    context.font = '20px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.fillText(topText, canvas.width / 2, 40);
    context.fillText(bottomText, canvas.width / 2, canvas.height - 40);

    const modifiedImageUrl = canvas.toDataURL('image/jpeg');

    setSelectedImage(modifiedImageUrl);
    setShowModifiedImage(true);
  };

  const handleToggleBlackAndWhite = () => {
    setIsBlackAndWhite((prevValue) => !prevValue);
    setIsInverted(false); // Сбросить другие фильтры
  };

  const handleToggleInverted = () => {
    setIsInverted((prevValue) => !prevValue);
    setIsBlackAndWhite(false); // Сбросить другие фильтры
  };

  const handleResetFilters = () => {
    setIsBlackAndWhite(false);
    setIsInverted(false);
  };

  return (
      <div className="container">
        <div className="slider">
          {slides.map((slide, index) => (
              <div
                  key={index}
                  className={`slide ${selectedSlide === index ? 'active' : ''}`}
                  onClick={() => handleSlideClick(index)}
              >
                <img
                    src={`img/image${index + 1}.jpg`}
                    alt="Slide"
                    className={`slide-image ${selectedImage === `img/image${index + 1}.jpg` ? 'enlarged' : ''}`}
                />
              </div>
          ))}
        </div>
        <div className="otstup"></div>
        <div className="button-container">
          <div className="top-left">
            <div className="input-row">
              <input
                  type="text"
                  placeholder="Input top text"
                  value={topText}
                  onChange={handleTopTextChange}
              />
              <input
                  type="text"
                  placeholder="Input bottom text"
                  value={bottomText}
                  onChange={handleBottomTextChange}
              />
              <button className="apply-button" onClick={handleApplyButtonClick}>
                GO
              </button>
            </div>
            <div className="filter-buttons">
              <button
                  className={`filter-button ${isBlackAndWhite ? 'active' : ''}`}
                  onClick={handleToggleBlackAndWhite}
              >
                B/W
              </button>
              <button
                  className={`filter-button ${isInverted ? 'active' : ''}`}
                  onClick={handleToggleInverted}
              >
                Inverted
              </button>
              <button className="reset-button" onClick={handleResetFilters}>
                Reset Filters
              </button>
            </div>
          </div>
          <div className="top-right">
            {showModifiedImage && selectedImage && (
                <img
                    src={selectedImage}
                    className={`selected-image ${isBlackAndWhite ? 'black-and-white' : ''} ${isInverted ? 'inverted' : ''}`}
                    alt="Selected"
                />
            )}
          </div>
        </div>
      </div>
  );
};

export default App;