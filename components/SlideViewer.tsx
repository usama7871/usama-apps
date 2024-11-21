"use client";
import Image from 'next/image';
import { SlideViewerProps } from '../types';
import { useState, useEffect, useCallback, useMemo } from 'react';

interface ExtendedSlideViewerProps extends SlideViewerProps {
  onSlideClick: (slideNumber: number) => void;
  images: string[];
}

const SlideViewer: React.FC<ExtendedSlideViewerProps> = ({
  currentSlide,
  onSlideClick,
  images,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const changeImage = useCallback(
    (direction: 1 | -1) => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + direction + images.length) % images.length
      );
    },
    [images.length]
  );

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1));

  const rotateLeft = () => setRotation((prev) => (prev - 90 + 360) % 360);
  const rotateRight = () => setRotation((prev) => (prev + 90) % 360);

  const resetView = () => {
    setZoomLevel(1);
    setRotation(0);
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = images[currentImageIndex];
    link.download = `slide-${currentImageIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
    setIsFullscreen(!isFullscreen);
  };

  const currentImageSrc = useMemo(() => images[currentImageIndex], [currentImageIndex, images]);

  useEffect(() => {
    if (!isFullscreen) {
      resetView();
    }
  }, [isFullscreen]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          changeImage(-1);
          break;
        case 'ArrowRight':
          changeImage(1);
          break;
        case '+':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case 'r':
          resetView();
          break;
        case '[':
          rotateLeft();
          break;
        case ']':
          rotateRight();
          break;
        default:
          break;
      }
    },
    [changeImage]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className={`slide-viewer ${isFullscreen ? 'fullscreen' : ''}`}
      style={{
        maxWidth: isFullscreen ? '100%' : '80%',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="image-container"
        onClick={() => onSlideClick(currentSlide)}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
        }}
      >
        <button onClick={() => changeImage(-1)} aria-label="Previous image">
          &#10094;
        </button>

        <div
          className="image-wrapper"
          style={{
            cursor: 'pointer',
            transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
            transition: 'transform 0.3s ease',
          }}
        >
          <Image
            src={currentImageSrc}
            alt={`Slide ${currentImageIndex + 1} of ${images.length}`}
            width={isFullscreen ? 800 : 400}
            height={isFullscreen ? 600 : 300}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <button onClick={() => changeImage(1)} aria-label="Next image">
          &#10095;
        </button>
      </div>

      <div className="controls" style={{ marginTop: '1rem', display: 'flex', gap: '10px' }}>
        <button onClick={handleZoomIn} aria-label="Zoom In">
          🔍+
        </button>
        <button onClick={handleZoomOut} aria-label="Zoom Out">
          🔍-
        </button>
        <button onClick={rotateLeft} aria-label="Rotate Left">
          ↺
        </button>
        <button onClick={rotateRight} aria-label="Rotate Right">
          ↻
        </button>
        <button onClick={resetView} aria-label="Reset View">
          ⟳ Reset
        </button>
        <button onClick={downloadImage} aria-label="Download Image">
          ⬇ Download
        </button>
        <button onClick={toggleFullscreen} aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}>
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>

      <div role="group" aria-label="Image indicators" style={{ marginTop: '1rem', display: 'flex', gap: '5px' }}>
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Slide ${index + 1}`}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: currentImageIndex === index ? '#3498db' : '#ccc',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p>
          Slide {currentImageIndex + 1} of {images.length}
        </p>
      </div>
    </div>
  );
};

export default SlideViewer;
