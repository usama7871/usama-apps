import { useEffect, useState, useCallback, useMemo } from 'react';
import VideoPlayer from '../../components/VideoPlayer';
import SlideViewer from '../../components/SlideViewer';

interface SlideData {
  timestamp: number;
  slide: number;
  images: string[];
}

const Project1: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [slideTimeline, setSlideTimeline] = useState<SlideData[]>([]);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [loadingStatus, setLoadingStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    const fetchSlideData = async () => {
      try {
        const response = await fetch('/slideMetadata.json');
        if (!response.ok) throw new Error('Failed to load slide metadata');

        const data = await response.json();
        setSlideTimeline(data.slides);
        setLoadingStatus('loaded');
      } catch (error) {
        console.error('Error fetching slide metadata:', error);
        setLoadingStatus('error');
      }
    };
    fetchSlideData();
  }, []);

  const handleTimeUpdate = useCallback((currentTime: number) => {
    const matchedSlide = slideTimeline.slice().reverse().find((slide) => currentTime >= slide.timestamp);
    
    if (matchedSlide) {
      setCurrentSlide(matchedSlide.slide);
    }

    if (videoRef?.duration) {
      setVideoProgress((currentTime / videoRef.duration) * 100);
    }
  }, [slideTimeline, videoRef]);

  const handleVideoRef = (ref: HTMLVideoElement) => setVideoRef(ref);

  const goToSlide = (slideNumber: number) => {
    const targetSlide = slideTimeline.find((s) => s.slide === slideNumber);
    if (targetSlide && videoRef) {
      setCurrentSlide(slideNumber);
      videoRef.currentTime = targetSlide.timestamp;
    }
  };

  const goToNextSlide = () => {
    if (currentSlide < slideTimeline.length) goToSlide(currentSlide + 1);
  };

  const goToPreviousSlide = () => {
    if (currentSlide > 1) goToSlide(currentSlide - 1);
  };

  const restartPresentation = () => {
    if (videoRef) {
      videoRef.currentTime = 0;
      setCurrentSlide(1);
      setVideoProgress(0);
    }
  };

  const currentSlideData = useMemo(() => {
    return slideTimeline.find((slide) => slide.slide === currentSlide);
  }, [currentSlide, slideTimeline]);

  return (
    <div className="container">
      <h1 className="project-title">Topic: The US</h1>

      {loadingStatus === 'loading' ? (
        <div className="loading-spinner">Loading...</div> // Spinner or animation
      ) : loadingStatus === 'error' ? (
        <p className="error-message" aria-live="assertive">
          Error loading slide data. Please try again later.
        </p>
      ) : (
        <>
          <VideoPlayer onTimeUpdate={handleTimeUpdate} setVideoRef={handleVideoRef} />
          
          {currentSlideData && (
            <>
              <SlideViewer
                currentSlide={currentSlide}
                onSlideClick={goToSlide}
                images={currentSlideData.images}
              />

              <div className="button-container" style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                <button
                  className="nav-button"
                  onClick={goToPreviousSlide}
                  disabled={currentSlide === 1}
                  aria-label="Previous Slide"
                >
                  Previous
                </button>
                <button
                  className="nav-button"
                  onClick={goToNextSlide}
                  disabled={currentSlide === slideTimeline.length}
                  aria-label="Next Slide"
                >
                  Next
                </button>
                <button
                  className="restart-button"
                  onClick={restartPresentation}
                  aria-label="Restart Presentation"
                >
                  Restart
                </button>
              </div>
            </>
          )}

          <div className="progress-bar" aria-label="Video Progress" style={{ marginTop: '1rem', width: '100%' }}>
            <div
              className="progress-bar-fill"
              style={{
                width: `${videoProgress}%`,
                height: '8px',
                backgroundColor: '#3498db',
                borderRadius: '4px',
                transition: 'width 0.2s ease',
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Project1;
