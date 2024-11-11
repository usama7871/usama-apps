import Image from 'next/image';
import { SlideViewerProps } from '../types';
import { useState, useEffect, useCallback, useMemo } from 'react';

// ExtendedSlideViewerProps extends SlideViewerProps by adding additional properties for handling slides
interface ExtendedSlideViewerProps extends SlideViewerProps {
  onSlideClick: (slideNumber: number) => void;  // Callback function triggered on slide click
  images: string[];                             // Array of image URLs associated with the current slide
}

// SlideViewer component displays a sequence of images with zoom, fullscreen, and navigation controls
const SlideViewer: React.FC<ExtendedSlideViewerProps> = ({
  currentSlide,
  onSlideClick,
  images,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);    // Current index of the displayed image
  const [isZoomed, setIsZoomed] = useState(false);                  // Tracks if the image is in zoomed-in mode
  const [zoomLevel, setZoomLevel] = useState(1);                    // Level of zoom applied to the image
  const [isFullscreen, setIsFullscreen] = useState(false);          // Tracks if the component is in fullscreen mode

  // Change the displayed image based on direction (-1 for previous, 1 for next)
  const changeImage = useCallback(
    (direction: 1 | -1) => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + direction + images.length) % images.length // Wraps around the images array
      );
    },
    [images.length]
  );

  // Toggle zoom state
  const toggleZoom = () => setIsZoomed((prev) => !prev);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  // Zoom in and out functionality
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1));

  // Memoize current image source to optimize rendering
  const currentImageSrc = useMemo(() => images[currentImageIndex], [currentImageIndex, images]);

  // Reset zoom level when exiting fullscreen
  useEffect(() => {
    if (!isFullscreen) {
      setIsZoomed(false);
      setZoomLevel(1);
    }
  }, [isFullscreen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        changeImage(-1); // Navigate to the previous image
        break;
      case 'ArrowRight':
        changeImage(1); // Navigate to the next image
        break;
      case 'Escape':
        if (isFullscreen) toggleFullscreen(); // Exit fullscreen on Escape
        break;
      case 'Enter':
      case ' ':
        toggleZoom(); // Toggle zoom on Enter or Space
        break;
      default:
        break;
    }
  }, [changeImage, isFullscreen]);

  // Attach keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className={`slide-viewer ${isZoomed ? 'zoomed' : ''} ${isFullscreen ? 'fullscreen' : ''}`}
      aria-label="Slide Viewer"
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
        onClick={() => onSlideClick(currentSlide)} // Trigger callback on slide click
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
        }}
      >
        <button onClick={() => changeImage(-1)} aria-label="Previous image" disabled={currentImageIndex === 0}>
          &#10094; {/* Left arrow symbol for previous */}
        </button>

        <div
          className="image-wrapper"
          onClick={toggleZoom} // Toggle zoom on image click
          style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in', transition: 'transform 0.3s ease' }}
        >
          <Image
            src={currentImageSrc}
            alt={`Slide ${currentSlide}`} // Descriptive alt text for accessibility
            width={isFullscreen ? 800 : 400} // Dynamic width based on fullscreen state
            height={isFullscreen ? 600 : 300} // Dynamic height based on fullscreen state
            style={{ transform: `scale(${zoomLevel})`, objectFit: 'cover' }} // Apply zoom level
          />
        </div>

        <button onClick={() => changeImage(1)} aria-label="Next image" disabled={currentImageIndex === images.length - 1}>
          &#10095; {/* Right arrow symbol for next */}
        </button>
      </div>

      <div className="controls" style={{ marginTop: '1rem', display: 'flex', gap: '10px' }}>
        <button onClick={handleZoomIn} aria-label="Zoom In" disabled={zoomLevel >= 3}>🔍+</button>
        <button onClick={handleZoomOut} aria-label="Zoom Out" disabled={zoomLevel <= 1}>🔍-</button>
        <button onClick={toggleFullscreen} aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}>
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>

      <div role="group" aria-label="Image indicators" style={{ marginTop: '1rem', display: 'flex', gap: '5px' }}>
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentImageIndex(index)} // Set current image index on indicator click
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
    </div>
  );
};

export default SlideViewer;  // Export SlideViewer for use in other components
