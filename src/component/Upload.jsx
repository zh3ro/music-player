import React, { useState } from 'react';

const Upload = ({ onUpload }) => {
  const [albumTitle, setAlbumTitle] = useState('');
  const [tracks, setTracks] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map(file => ({
      title: file.name,
      src: URL.createObjectURL(file)
    }));
    setTracks(files);
  };

  const handleUpload = () => {
    onUpload(albumTitle, tracks);
    setAlbumTitle('');
    setTracks([]);
  };

  return (
    <div className="upload">
      <h2>Upload Music</h2>
      <input
        type="text"
        placeholder="Album Title"
        value={albumTitle}
        onChange={(e) => setAlbumTitle(e.target.value)}
      />
      <input
        type="file"
        multiple
        accept="audio/*"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Upload;
