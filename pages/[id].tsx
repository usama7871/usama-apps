// "use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import VideoPlayer from "../components/VideoPlayer";
import SlideViewer from "../components/SlideViewer";
import { FaArrowLeft, FaArrowRight, FaRedo } from "react-icons/fa";

// Define the structure of each slide's metadata
interface SlideData {
  timestamp: number; // Video timestamp corresponding to the slide
  slide: number; // Slide number
  images: string[]; // List of image URLs for the slide
}

// Main component for the project page
const ProjectPage: React.FC = () => {
  // State for managing the current slide
  const [currentSlide, setCurrentSlide] = useState(1);

  // State for storing the slide timeline metadata
  const [slideTimeline, setSlideTimeline] = useState<SlideData[]>([]);

  // State for tracking the video progress percentage
  const [videoProgress, setVideoProgress] = useState(0);

  // Ref to the video element for controlling playback programmatically
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  // State for indicating the loading status of slide metadata
  const [loadingStatus, setLoadingStatus] = useState<"loading" | "loaded" | "error">("loading");

  // Fetch slide metadata from a JSON file in the public directory
  useEffect(() => {
    const fetchSlideData = async () => {
      try {
        const response = await fetch("/slideMetadata.json"); // Fetch slide metadata
        const data = await response.json();
        setSlideTimeline(data.slides); // Set timeline data to state
        setLoadingStatus("loaded"); // Update loading status
      } catch (error) {
        console.error("Error fetching slide metadata:", error); // Log fetch errors
        setLoadingStatus("error"); // Set error status for UI feedback
      }
    };

    fetchSlideData(); // Trigger fetch operation on component mount
  }, []);

  // Update slide based on video time
  const handleTimeUpdate = useCallback(
    (currentTime: number) => {
      // Find the most recent slide matching the current video timestamp
      const matchedSlide = slideTimeline
        .slice()
        .reverse()
        .find((slide) => currentTime >= slide.timestamp);

      // Update the current slide if a match is found
      if (matchedSlide) setCurrentSlide(matchedSlide.slide);

      // Update video progress as a percentage of total duration
      if (videoRef?.duration) {
        setVideoProgress((currentTime / videoRef.duration) * 100);
      }
    },
    [slideTimeline, videoRef]
  );

  // Store the video reference for later use
  const handleVideoRef = useCallback((ref: HTMLVideoElement) => {
    setVideoRef(ref);
  }, []);

  // Navigate to a specific slide manually
  const goToSlideManually = useCallback(
    (slideNumber: number) => {
      const targetSlide = slideTimeline.find((s) => s.slide === slideNumber);
      if (targetSlide) {
        setCurrentSlide(slideNumber);
      }
    },
    [slideTimeline]
  );

  // Navigate to the next slide
  const goToNextSlide = useCallback(() => {
    const nextSlide = currentSlide + 1;
    if (nextSlide <= slideTimeline.length) {
      goToSlideManually(nextSlide); // Update the current slide
      if (videoRef) {
        // Jump video to the next slide's timestamp
        const nextSlideTimestamp =
          slideTimeline.find((slide) => slide.slide === nextSlide)?.timestamp || 0;
        videoRef.currentTime = nextSlideTimestamp;
      }
    }
  }, [currentSlide, slideTimeline, videoRef, goToSlideManually]);

  // Navigate to the previous slide
  const goToPreviousSlide = useCallback(() => {
    const prevSlide = currentSlide - 1;
    if (prevSlide >= 1) {
      goToSlideManually(prevSlide); // Update the current slide
      if (videoRef) {
        // Jump video to the previous slide's timestamp
        const prevSlideTimestamp =
          slideTimeline.find((slide) => slide.slide === prevSlide)?.timestamp || 0;
        videoRef.currentTime = prevSlideTimestamp;
      }
    }
  }, [currentSlide, slideTimeline, videoRef, goToSlideManually]);

  // Restart the presentation by resetting the video and slides
  const restartPresentation = useCallback(() => {
    if (videoRef) {
      videoRef.currentTime = 0; // Reset video to the start
      setCurrentSlide(1); // Reset to the first slide
      setVideoProgress(0); // Reset progress bar
    }
  }, [videoRef]);

  // Handle keyboard navigation for slides
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goToNextSlide();
      } else if (event.key === "ArrowLeft") {
        goToPreviousSlide();
      }
    },
    [goToNextSlide, goToPreviousSlide]
  );

  // Attach and detach the keyboard event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Memoize the current slide data for rendering
  const currentSlideData = useMemo(
    () => slideTimeline.find((slide) => slide.slide === currentSlide),
    [currentSlide, slideTimeline]
  );

  return (
    <div className="project-container">
      <h1 className="project-title">Topic: The US</h1>
      {/* Display appropriate content based on loading status */}
      {loadingStatus === "loading" ? (
        <div className="loading-spinner">Loading...</div>
      ) : loadingStatus === "error" ? (
        <p className="error-message" aria-live="assertive">
          Error loading slide data. Please try again later.
        </p>
      ) : (
        <div className="content-wrapper">
          <div className="video-and-controls">
            {/* Video player with progress bar */}
            <VideoPlayer onTimeUpdate={handleTimeUpdate} setVideoRef={handleVideoRef} />
            <div className="progress-bar" aria-label="Video Progress">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${videoProgress}%`,
                }}
              />
            </div>
          </div>
          <div className="slide-and-navigation">
            {/* Slide viewer for displaying images */}
            {currentSlideData && (
              <SlideViewer
                currentSlide={currentSlide}
                onSlideClick={goToSlideManually}
                images={currentSlideData.images}
              />
            )}
            <div className="button-container">
              {/* Navigation buttons */}
              <button
                className="nav-button"
                onClick={goToPreviousSlide}
                disabled={currentSlide === 1}
                aria-label="Previous Slide"
              >
                <FaArrowLeft />
              </button>
              <button
                className="nav-button"
                onClick={goToNextSlide}
                disabled={currentSlide === slideTimeline.length}
                aria-label="Next Slide"
              >
                <FaArrowRight />
              </button>
              <button
                className="restart-button"
                onClick={restartPresentation}
                aria-label="Restart Presentation"
              >
                <FaRedo />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
