import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [showModifiedImage, setShowModifiedImage] = useState(false);
  const [isBlackAndWhite, setIsBlackAndWhite] = useState(false);


  const handleSlideClick = (index) => {
    if (selectedSlide === index) {
// Если выбран уже выбранный слайд, обнуляем выбранный слайд и изображение
      setSelectedSlide(null);
      setSelectedImage(null);
      setShowModifiedImage(false);
    } else {
// Если выбран новый слайд, обновляем выбранный слайд и изображение
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
    if (selectedImage) {
// Здесь вы можете выполнить необходимую обработку, чтобы добавить текст к изображению.
// Например, вы можете использовать библиотеку для обработки изображений или создать изображение с помощью canvas.

// В данном случае просто обновим выбранное изображение с текстом.
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

// сохранить модифицированное изображение и т.д.
// В данном случае просто обновим выбранное изображение для отображения в приложении.
      const modifiedImageUrl = canvas.toDataURL('image/jpeg');
      setSelectedImage(modifiedImageUrl);
      setShowModifiedImage(true);
    } else {
      if (topText || bottomText) {
// Выводим подсказку, если отсутствует выбранное изображение, но есть текст в полях
        alert('you need to choose an image');
      }
    }
  };
  const handleToggleBlackAndWhite = () => {
    setIsBlackAndWhite((prevValue) => !prevValue);
  };
  const slides = [
    { title: 'Слайд 1' },
    { title: 'Слайд 2' },
    { title: 'Слайд 3' },
    { title: 'Слайд 4' },
    { title: 'Слайд 5' },
    { title: 'Слайд 6' },
  ];

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
                GO to Meme
              </button>
            </div>

            <div className="input-row">
              <button className="apply-button" onClick={handleToggleBlackAndWhite}>
                Toggle B/W
              </button>
            </div>

          </div>
          <div className="top-right">
            {showModifiedImage && selectedImage && (
                <img
                    src={selectedImage}
                    className={'selected-image ' + (isBlackAndWhite ? 'black-and-white' : '')}
                    alt="Selected"
                />
            )}
          </div>
        </div>
      </div>
  );
};
export default App;