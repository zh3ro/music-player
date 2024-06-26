import React, { useState, useRef } from 'react';
import Visualizer from './component/visualizer';
import Upload from './component/Upload';
import './App.css';

const initialTracks = [
  { title: 'Song 1', src: '/path/to/song1.mp3' },
  { title: 'Song 2', src: '/path/to/song2.mp3' },
  { title: 'Song 3', src: '/path/to/song3.mp3' },
];

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState(initialTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handleUpload = (albumTitle, uploadedTracks) => {
    const newTracks = uploadedTracks.map(track => ({
      ...track,
      title: `${albumTitle} - ${track.title}`
    }));
    setTracks(prevTracks => [...prevTracks, ...newTracks]);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIndex);
    audioRef.current.src = tracks[nextIndex].src;
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const handlePrevTrack = () => {
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIndex);
    audioRef.current.src = tracks[prevIndex].src;
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <div className="music-player">
      <h1>Music Player</h1>
      <p>Now playing: {tracks[currentTrackIndex].title}</p>
      <audio ref={audioRef} src={tracks[currentTrackIndex].src}></audio>
      <div className="controls">
        <button onClick={handlePrevTrack}>Previous</button>
        <button onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={handleNextTrack}>Next</button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <div className="progress">
        <input
          type="range"
          min="0"
          max={duration}
          step="0.01"
          value={currentTime}
          onChange={(e) => (audioRef.current.currentTime = e.target.value)}
        />
      </div>
      <Upload onUpload={handleUpload} />
      <Visualizer />
    </div>
  );
};

export default App;
