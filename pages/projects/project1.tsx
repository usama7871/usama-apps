"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import VideoPlayer from "../../components/VideoPlayer";
import SlideViewer from "../../components/SlideViewer";
import { FaArrowLeft, FaArrowRight, FaRedo } from "react-icons/fa";

interface SlideData {
  timestamp: number;
  slide: number;
  images: string[];
}

const Project1: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [slideTimeline, setSlideTimeline] = useState<SlideData[]>([]);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [loadingStatus, setLoadingStatus] = useState<
    "loading" | "loaded" | "error"
  >("loading");

  // Fetch slide metadata with absolute URL for better reliability
  useEffect(() => {
    const fetchSlideData = async () => {
      try {
        const response = await fetch("/slideMetadata.json"); // Ensure this file exists in /public
        if (!response.ok) throw new Error("Failed to load slide metadata");
        const data = await response.json();
        setSlideTimeline(data.slides);
        setLoadingStatus("loaded");
      } catch (error) {
        console.error("Error fetching slide metadata:", error);
        setLoadingStatus("error");
      }
    };

    fetchSlideData();
  }, []);

  const handleTimeUpdate = useCallback(
    (currentTime: number) => {
      const matchedSlide = slideTimeline
        .slice()
        .reverse()
        .find((slide) => currentTime >= slide.timestamp);

      if (matchedSlide) setCurrentSlide(matchedSlide.slide);

      if (videoRef?.duration) {
        setVideoProgress((currentTime / videoRef.duration) * 100);
      }
    },
    [slideTimeline, videoRef]
  );

  const handleVideoRef = useCallback((ref: HTMLVideoElement) => {
    setVideoRef(ref);
  }, []);

  const goToSlideManually = useCallback(
    (slideNumber: number) => {
      const targetSlide = slideTimeline.find((s) => s.slide === slideNumber);
      if (targetSlide) {
        setCurrentSlide(slideNumber);
      }
    },
    [slideTimeline]
  );

  const goToNextSlide = useCallback(() => {
    const nextSlide = currentSlide + 1;
    if (nextSlide <= slideTimeline.length) {
      goToSlideManually(nextSlide);
      if (videoRef) {
        const nextSlideTimestamp =
          slideTimeline.find((slide) => slide.slide === nextSlide)?.timestamp ||
          0;
        videoRef.currentTime = nextSlideTimestamp;
      }
    }
  }, [currentSlide, slideTimeline.length, slideTimeline, videoRef, goToSlideManually]);

  const goToPreviousSlide = useCallback(() => {
    const prevSlide = currentSlide - 1;
    if (prevSlide >= 1) {
      goToSlideManually(prevSlide);
      if (videoRef) {
        const prevSlideTimestamp =
          slideTimeline.find((slide) => slide.slide === prevSlide)?.timestamp ||
          0;
        videoRef.currentTime = prevSlideTimestamp;
      }
    }
  }, [currentSlide, slideTimeline, videoRef, goToSlideManually]);

  const restartPresentation = useCallback(() => {
    if (videoRef) {
      videoRef.currentTime = 0;
      setCurrentSlide(1);
      setVideoProgress(0);
    }
  }, [videoRef]);

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

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const currentSlideData = useMemo(
    () => slideTimeline.find((slide) => slide.slide === currentSlide),
    [currentSlide, slideTimeline]
  );

  return (
    <div className="project-container">
      <h1 className="project-title">Topic: The US</h1>
      {loadingStatus === "loading" ? (
        <div className="loading-spinner">Loading...</div>
      ) : loadingStatus === "error" ? (
        <p className="error-message" aria-live="assertive">
          Error loading slide data. Please try again later.
        </p>
      ) : (
        <div className="content-wrapper">
          <div className="video-and-controls">
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
            {currentSlideData && (
              <SlideViewer
                currentSlide={currentSlide}
                onSlideClick={goToSlideManually}
                images={currentSlideData.images}
              />
            )}
            <div className="button-container">
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

export default Project1;
