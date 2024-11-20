// types/index.d.ts

/**
 * Properties for the `VideoPlayer` component.
 * 
 * @property onTimeUpdate - A callback function invoked with the current video time (in seconds)
 *                           whenever the video's playback time updates.
 */
export interface VideoPlayerProps {
  onTimeUpdate: (currentTime: number) => void;
}

/**
 * Properties for the `SlideViewer` component.
 * 
 * @property currentSlide - The index of the currently displayed slide (0-based).
 */
export interface SlideViewerProps {
  currentSlide: number;
}

/**
 * Extended properties for the `SlideViewer` component.
 * 
 * @property onSlideClick - A callback function invoked with the clicked slide number
 *                           whenever a slide is clicked.
 * @property images - An array of image URLs to display within the slide viewer.
 */
export interface ExtendedSlideViewerProps extends SlideViewerProps {
  onSlideClick: (slideNumber: number) => void;
  images: string[];
}

/**
 * Extended properties for a `VideoPlayer` component with additional controls.
 * 
 * @property setVideoRef - A function to set a reference to the HTML video element, allowing direct
 *                          control of the video (e.g., play, pause).
 */
export interface ExtendedVideoPlayerProps extends VideoPlayerProps {
  setVideoRef: (ref: HTMLVideoElement) => void;
}

/**
 * Properties for the `ProgressBar` component.
 * 
 * @property progress - A number representing the progress as a percentage (0–100).
 * @property onSeek - A callback function triggered when the user interacts with the progress bar.
 */
export interface ProgressBarProps {
  progress: number;
  onSeek?: (progress: number) => void; // Optional callback for when the user seeks on the progress bar
}

/**
 * Properties for the `Header` component.
 * 
 * @property title - The main title to display in the header.
 * @property subtitle - An optional subtitle for additional context.
 */
export interface HeaderProps {
  title: string;
  subtitle?: string;
}

/**
 * Properties for the `Footer` component.
 * 
 * @property text - Text or copyright information to display in the footer.
 */
export interface FooterProps {
  text: string;
}
//edited below
export interface VideoPlayerProps {
  onTimeUpdate: (currentTime: number) => void;
  setVideoRef: (ref: HTMLVideoElement) => void;
}
