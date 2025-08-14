import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './uploader.css';
import { Button } from '../button/Button';
import { ProgressBar } from '../progress-bar/ProgressBar';
import { Spinner } from '../spinner/Spinner';
import { Alert } from '../alert/Alert';
import { UploadIcon } from '../../icons';

export const Uploader = ({ onUpload, acceptedFileTypes }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // idle, uploading, success, error
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile) => {
    if (acceptedFileTypes && !acceptedFileTypes.includes(selectedFile.type)) {
        setStatus('error');
        setError(`Invalid file type. Please upload one of: ${acceptedFileTypes.join(', ')}`);
        return;
    }

    setFile(selectedFile);
    setStatus('idle');
    setError(null);

    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus('uploading');
    setProgress(0);
    setError(null);

    try {
      // Mock upload process
      for (let p = 0; p <= 100; p += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setProgress(p);
      }

      const result = await onUpload(file);
      setStatus('success');
      console.log('Upload successful:', result);
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Upload failed.');
    }
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('drag-over');
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  }, []);

  const handleRemoveFile = () => {
      setFile(null);
      setPreview(null);
      setStatus('idle');
      setError(null);
      setProgress(0);
  }

  return (
    <div className="uploader">
      <div
        className="uploader-dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
      >
        <input id="file-input" type="file" onChange={handleFileChange} accept={acceptedFileTypes?.join(',')} style={{ display: 'none' }} />
        <UploadIcon />
        <p>Drag & drop a file here, or click to select a file</p>
      </div>

      {error && <Alert type="error" message={error} />}

      {file && (
        <div className="file-details">
            <div className="preview-section">
                {preview && <img src={preview} alt="Preview" className="file-preview" />}
                <div className="file-info">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">{(file.size / 1024).toFixed(2)} KB</span>
                </div>
            </div>

            {status === 'uploading' && <ProgressBar progress={progress} showPercentage />}

            <div className="action-buttons">
                {status !== 'uploading' && <Button label="Remove" size="small" onClick={handleRemoveFile} />}
                {status !== 'uploading' && <Button primary label="Upload" size="small" onClick={handleUpload} />}
                {status === 'uploading' && <Spinner size="small" />}
            </div>
        </div>
      )}

      {status === 'success' && <Alert type="success" message="File uploaded successfully!" />}
    </div>
  );
};

Uploader.propTypes = {
  onUpload: PropTypes.func.isRequired,
  acceptedFileTypes: PropTypes.arrayOf(PropTypes.string),
};

Uploader.defaultProps = {
    acceptedFileTypes: null,
}

export default Uploader;
