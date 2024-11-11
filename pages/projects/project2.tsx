// pages/projects/project1.tsx

import { useEffect, useState, useCallback } from 'react';
import VideoPlayer from '../../components/VideoPlayer';
import SlideViewer from '../../components/SlideViewer';

// Define a TypeScript interface to enforce the structure of slide metadata
// This interface ensures each slide has a timestamp, slide number, and an array of image paths
interface SlideData {
  timestamp: number;  // Time in seconds when the slide should appear in the video
  slide: number;      // Unique identifier for each slide
  images: string[];   // Array of image URLs associated with the slide
}

const Project1: React.FC = () => {
  // State variables to manage current slide, timeline of slides, video progress, and loading status
  const [currentSlide, setCurrentSlide] = useState<number>(1);                 // Stores the currently active slide number
  const [slideTimeline, setSlideTimeline] = useState<SlideData[]>([]);         // Holds all slide metadata loaded from JSON
  const [videoProgress, setVideoProgress] = useState<number>(0);               // Represents the progress of the video as a percentage
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);     // Reference to the video element for direct control
  const [loadingStatus, setLoadingStatus] = useState<'loading' | 'loaded' | 'error'>('loading'); // Tracks the loading state

  // Load slide data from JSON when the component mounts
  useEffect(() => {
    const fetchSlideData = async () => {
      try {
        // Fetch slide metadata from a JSON file located at '/slideMetadata.json'
        const response = await fetch('/slideMetadata.json');
        if (!response.ok) throw new Error('Failed to load slide metadata'); // Error if data fails to load

        // Parse JSON response and extract slides array into state
        const data = await response.json();
        setSlideTimeline(data.slides);  // Save fetched slide data to slideTimeline
        setLoadingStatus('loaded');     // Set loading status to 'loaded' on success
      } catch (error) {
        console.error('Error fetching slide metadata:', error); // Log error if fetch fails
        setLoadingStatus('error');      // Set loading status to 'error' on failure
      }
    };
    fetchSlideData();  // Execute data fetch on component mount
  }, []);

  // Syncs the slide display with video playback time
  // Runs whenever the video time is updated
  const handleTimeUpdate = useCallback((currentTime: number) => {
    // Find the most recent slide that should be active based on the current time
    const matchedSlide = slideTimeline.slice().reverse().find((slide) => currentTime >= slide.timestamp);
    
    // Update the current slide if a matching slide is found
    if (matchedSlide) setCurrentSlide(matchedSlide.slide);

    // Calculate video progress as a percentage and update state
    if (videoRef?.duration) {
      setVideoProgress((currentTime / videoRef.duration) * 100);
    }
  }, [slideTimeline, videoRef]);

  // Set the reference to the HTMLVideoElement for controlling video playback
  const handleVideoRef = (ref: HTMLVideoElement) => setVideoRef(ref);

  // Helper function to jump to a specific slide and sync video time
  const goToSlide = (slideNumber: number) => {
    // Locate the target slide by slide number
    const targetSlide = slideTimeline.find((s) => s.slide === slideNumber);
    if (targetSlide && videoRef) {
      videoRef.currentTime = targetSlide.timestamp;  // Set video time to target slide's timestamp
      setCurrentSlide(slideNumber);                  // Update current slide state
    }
  };

  // Navigate to the next slide by incrementing the slide number
  const goToNextSlide = () => {
    if (currentSlide < slideTimeline.length) goToSlide(currentSlide + 1);  // Only proceed if not on the last slide
  };

  // Navigate to the previous slide by decrementing the slide number
  const goToPreviousSlide = () => {
    if (currentSlide > 1) goToSlide(currentSlide - 1);  // Only proceed if not on the first slide
  };

  // Restart the video and reset to the first slide
  const restartPresentation = () => {
    if (videoRef) {
      videoRef.currentTime = 0;  // Reset video time to the beginning
      setCurrentSlide(1);        // Reset to the first slide
    }
  };

  // Retrieve data for the current slide to pass to the SlideViewer component
  const currentSlideData = slideTimeline.find((slide) => slide.slide === currentSlide);

  return (
    <div className="container">
      <h1 className="project-title">First Educational Project</h1>

      {/* Display loading or error messages, or render main content if data is loaded */}
      {loadingStatus === 'loading' ? (
        <p>Loading slides and video...</p>  // Show loading message while data is being fetched
      ) : loadingStatus === 'error' ? (
        <p className="error-message" aria-live="assertive">Error loading slide data. Please try again later.</p> // Show error if data fetch failed
      ) : (
        <>
          {/* Render the VideoPlayer component and pass the time update and reference functions */}
          <VideoPlayer onTimeUpdate={handleTimeUpdate} setVideoRef={handleVideoRef} />

          {/* Render the SlideViewer component only if there is data for the current slide */}
          {currentSlideData && (
            <>
              <SlideViewer
                currentSlide={currentSlide}            // Pass the current slide number
                onSlideClick={goToSlide}               // Provide function for navigating to a specific slide
                images={currentSlideData.images}       // Pass images for the current slide
              />

              {/* Navigation buttons for slide control */}
              <div className="button-container" style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                <button
                  className="nav-button"
                  onClick={goToPreviousSlide}
                  disabled={currentSlide === 1}         // Disable button if on the first slide
                  aria-label="Previous Slide"
                >
                  Previous
                </button>
                <button
                  className="nav-button"
                  onClick={goToNextSlide}
                  disabled={currentSlide === slideTimeline.length} // Disable button if on the last slide
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

          {/* Progress bar to visually show video playback progress */}
          <div className="progress-bar" aria-label="Video Progress" style={{ marginTop: '1rem', width: '100%' }}>
            <div
              className="progress-bar-fill"
              style={{
                width: `${videoProgress}%`,             // Set width based on video progress
                height: '8px',                          // Height of progress bar
                backgroundColor: '#3498db',             // Color of the progress bar fill
                borderRadius: '4px',                    // Rounded corners for a polished look
                transition: 'width 0.2s ease',          // Smooth transition for progress bar updates
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Project1;  // Export the Project1 component for use in routing
