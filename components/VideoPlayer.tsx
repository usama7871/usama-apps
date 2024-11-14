import { useRef, useEffect, useState, useCallback } from 'react';
import { VideoPlayerProps } from '../types';

interface ExtendedVideoPlayerProps extends VideoPlayerProps {
  setVideoRef: (ref: HTMLVideoElement) => void;
}

const useVideoPlayer = (
  videoRef: React.RefObject<HTMLVideoElement>,
  onTimeUpdate?: (currentTime: number) => void
) => {
  const [videoState, setVideoState] = useState({
    isPlaying: false,
    volume: 1,
    isMuted: false,
    progress: 0,
    isFullscreen: false,
    playbackRate: 1,
    currentTime: 0,
    duration: 0,
  });

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (videoState.isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  }, [videoRef, videoState.isPlaying]);

  const handleVolumeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(event.target.value);
      if (videoRef.current) {
        videoRef.current.volume = newVolume;
        setVideoState((prev) => ({ ...prev, volume: newVolume, isMuted: newVolume === 0 }));
      }
    },
    [videoRef]
  );

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const muted = !videoState.isMuted;
      videoRef.current.muted = muted;
      setVideoState((prev) => ({ ...prev, isMuted: muted }));
    }
  }, [videoRef, videoState.isMuted]);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setVideoState((prev) => ({
        ...prev,
        currentTime,
        duration,
        progress: (currentTime / duration) * 100,
      }));
      if (onTimeUpdate) onTimeUpdate(currentTime);
    }
  }, [videoRef, onTimeUpdate]);

  const handleSeek = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (videoRef.current) {
        const newTime = (parseFloat(event.target.value) / 100) * videoRef.current.duration;
        videoRef.current.currentTime = newTime;
      }
    },
    [videoRef]
  );

  const toggleFullscreen = useCallback(() => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch(console.error);
        setVideoState((prev) => ({ ...prev, isFullscreen: true }));
      } else {
        document.exitFullscreen().catch(console.error);
        setVideoState((prev) => ({ ...prev, isFullscreen: false }));
      }
    }
  }, [videoRef]);

  const handleSkip = useCallback(
    (time: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = Math.min(
          Math.max(videoRef.current.currentTime + time, 0),
          videoRef.current.duration
        );
      }
    },
    [videoRef]
  );

  const handlePlaybackRateChange = useCallback(
    (rate: number) => {
      if (videoRef.current) {
        videoRef.current.playbackRate = rate;
        setVideoState((prev) => ({ ...prev, playbackRate: rate }));
      }
    },
    [videoRef]
  );

  const restartVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setVideoState((prev) => ({ ...prev, progress: 0 }));
    }
  }, [videoRef]);

  return {
    videoState,
    togglePlayPause,
    handleVolumeChange,
    toggleMute,
    handleTimeUpdate,
    toggleFullscreen,
    handleSeek,
    handleSkip,
    handlePlaybackRateChange,
    restartVideo,
  };
};

const VideoPlayer: React.FC<ExtendedVideoPlayerProps> = ({ onTimeUpdate, setVideoRef }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const {
    videoState,
    togglePlayPause,
    handleVolumeChange,
    toggleMute,
    handleTimeUpdate,
    toggleFullscreen,
    handleSeek,
    handleSkip,
    handlePlaybackRateChange,
    restartVideo,
  } = useVideoPlayer(videoRef, onTimeUpdate);

  useEffect(() => {
    if (videoRef.current) {
      setVideoRef(videoRef.current);
    }
  }, [setVideoRef]);

  return (
    <div className="video-player" style={{ maxWidth: '100%', margin: '0 auto', padding: '20px' }}>
      <video
        ref={videoRef}
        src="/videos/lesson1.mp4"
        width="100%"
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlayPause}
        onDoubleClick={toggleFullscreen}
        style={{
          cursor: 'pointer',
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
        }}
      />

      <div
        className="controls"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 0',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="control-button" onClick={togglePlayPause}>
            {videoState.isPlaying ? 'Pause' : 'Play'}
          </button>
          <button className="control-button" onClick={() => handleSkip(-10)}>
            ⏪ -10s
          </button>
          <button className="control-button" onClick={() => handleSkip(10)}>
            ⏩ +10s
          </button>
          <button className="control-button" onClick={restartVideo}>
            ⏮ Restart
          </button>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={videoState.progress}
          onChange={handleSeek}
          style={{ flex: 1, margin: '0 10px' }}
        />
        <span>
          {new Date(videoState.currentTime * 1000).toISOString().substr(11, 8)} /{' '}
          {new Date(videoState.duration * 1000).toISOString().substr(11, 8)}
        </span>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="control-button" onClick={toggleMute}>
            {videoState.isMuted ? 'Unmute' : 'Mute'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={videoState.volume}
            onChange={handleVolumeChange}
            style={{ width: '100px' }}
          />
          <button className="control-button" onClick={toggleFullscreen}>
            {videoState.isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          <select
            className="control-button"
            value={videoState.playbackRate}
            onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
            style={{ padding: '4px' }}
          >
            {[0.5, 1, 1.5, 2].map((rate) => (
              <option key={rate} value={rate}>
                {rate}x
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;