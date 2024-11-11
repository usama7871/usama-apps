// components/VideoPlayer.tsx

import { useRef, useEffect, useState, useCallback } from 'react';
import { VideoPlayerProps } from '../types';

// Extend the VideoPlayerProps interface to include a function for setting the video reference
interface ExtendedVideoPlayerProps extends VideoPlayerProps {
  setVideoRef: (ref: HTMLVideoElement) => void; // Function to pass video element reference to parent component
}

// Custom hook to manage video controls and state
const useVideoPlayer = (videoRef: React.RefObject<HTMLVideoElement>, onTimeUpdate?: (currentTime: number) => void) => {
  const [videoState, setVideoState] = useState({
    isPlaying: false,  // Indicates if the video is currently playing
    volume: 1,        // Current volume level (0.0 to 1.0)
    isMuted: false,    // Indicates if the video is muted
    progress: 0,      // Current playback progress percentage
    isFullscreen: false, // Indicates if the video is in fullscreen mode
  });

  // Toggle play/pause functionality
  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (videoState.isPlaying) {
        videoRef.current.pause(); // Pause the video if it's currently playing
      } else {
        videoRef.current.play(); // Play the video if it's paused
      }
      setVideoState((prev) => ({ ...prev, isPlaying: !prev.isPlaying })); // Update play state
    }
  }, [videoRef, videoState.isPlaying]);

  // Handle volume change from the volume slider
  const handleVolumeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume; // Set new volume on the video element
      setVideoState((prev) => ({ ...prev, volume: newVolume, isMuted: newVolume === 0 })); // Update volume and mute state
    }
  }, [videoRef]);

  // Toggle mute/unmute functionality
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const muted = !videoState.isMuted; // Determine new mute state
      videoRef.current.muted = muted; // Set mute state on the video element
      setVideoState((prev) => ({ ...prev, isMuted: muted })); // Update mute state
    }
  }, [videoRef, videoState.isMuted]);

  // Update playback progress
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime; // Get current time of the video
      const duration = videoRef.current.duration; // Get total duration of the video
      setVideoState((prev) => ({ ...prev, progress: (currentTime / duration) * 100 })); // Calculate and update progress percentage
      if (onTimeUpdate) onTimeUpdate(currentTime); // Call onTimeUpdate callback if provided
    }
  }, [videoRef, onTimeUpdate]);

  // Handle fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen()
          .then(() => setVideoState((prev) => ({ ...prev, isFullscreen: true })))
          .catch(console.error);
      } else {
        document.exitFullscreen()
          .then(() => setVideoState((prev) => ({ ...prev, isFullscreen: false })))
          .catch(console.error);
      }
    }
  }, [videoRef]);

  // Handle seeking to a specific time in the video
  const handleSeek = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = (parseFloat(event.target.value) / 100) * videoRef.current.duration; // Convert percentage to actual time
      videoRef.current.currentTime = newTime; // Set the current time of the video
    }
  }, [videoRef]);

  return {
    videoState,          // Current state of the video player
    togglePlayPause,     // Function to toggle play/pause
    handleVolumeChange,  // Function to handle volume changes
    toggleMute,          // Function to toggle mute/unmute
    handleTimeUpdate,    // Function to handle time updates
    toggleFullscreen,     // Function to toggle fullscreen mode
    handleSeek,          // Function to handle seeking
  };
};

// The VideoPlayer component handles video playback, controls, and state management
const VideoPlayer: React.FC<ExtendedVideoPlayerProps> = ({ onTimeUpdate, setVideoRef }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null); // Ref for the video element
  const {
    videoState,
    togglePlayPause,
    handleVolumeChange,
    toggleMute,
    handleTimeUpdate,
    toggleFullscreen,
    handleSeek,
  } = useVideoPlayer(videoRef, onTimeUpdate); // Use custom hook for video player logic

  // Effect to set the video reference when the component mounts
  useEffect(() => {
    if (videoRef.current) {
      setVideoRef(videoRef.current); // Pass video reference to the parent component
    }
  }, [setVideoRef]);

  return (
    <div className="video-player">
      {/* Video element */}
      <video
        ref={videoRef} // Assign video ref
        src="/videos/lesson1.mp4" // Source of the video
        width="100%" // Full width
        onTimeUpdate={handleTimeUpdate} // Update time on playback
        onClick={togglePlayPause} // Toggle play/pause on click
        onDoubleClick={toggleFullscreen} // Toggle fullscreen on double-click
        style={{ cursor: 'pointer' }} // Change cursor to pointer for user feedback
      />

      {/* Controls for the video */}
      <div className="controls" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0' }}>
        {/* Play/Pause button */}
        <button onClick={togglePlayPause} aria-label={videoState.isPlaying ? 'Pause video' : 'Play video'}>
          {videoState.isPlaying ? 'Pause' : 'Play'}
        </button>

        {/* Progress bar for video playback */}
        <input
          type="range"
          min="0"
          max="100"
          value={videoState.progress} // Current playback progress
          onChange={handleSeek} // Seek video on change
          aria-label="Video progress" // Accessibility label
          style={{ flex: 1 }} // Flexible width
        />

        {/* Mute/Unmute button */}
        <button onClick={toggleMute} aria-label={videoState.isMuted ? 'Unmute' : 'Mute'}>
          {videoState.isMuted ? 'Unmute' : 'Mute'}
        </button>

        {/* Volume control slider */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={videoState.volume} // Current volume level
          onChange={handleVolumeChange} // Update volume on change
          aria-label="Volume" // Accessibility label
        />

        {/* Fullscreen toggle button */}
        <button onClick={toggleFullscreen} aria-label={videoState.isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}>
          {videoState.isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
