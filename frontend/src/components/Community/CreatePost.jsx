import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ onPostCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    problemDescription: '',
    cropType: 'Wheat',
    category: 'Pest',
    state: 'Punjab'
  });

  const [files, setFiles] = useState({
    image: null,
    video: null
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState({
    image: null,
    video: null
  });

  const navigate = useNavigate();

  const cropTypes = ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize', 'Potato', 'Onion', 'Tomato', 'Pulses'];
  const categories = ['Pest', 'Fertilizer', 'Weather', 'Disease', 'Irrigation', 'Market', 'Equipment', 'Other'];
  const states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles[0]) {
      setFiles(prev => ({
        ...prev,
        [name]: selectedFiles[0]
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(prev => ({
          ...prev,
          [name]: event.target.result
        }));
      };
      reader.readAsDataURL(selectedFiles[0]);
    }
  };

  const uploadFile = async (file, type) => {
    const formDataFile = new FormData();
    formDataFile.append('file', file);
    formDataFile.append('type', type);

    try {
        console.log('Uploading file:', file.name);
        
      const response = await fetch('http://localhost:8080/api/community/posts/upload', {  // ✅ ADD /posts
        method: 'POST',
        body: formDataFile
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Upload successful:', data);
        return data.url;
      } else {
      const errorText = await response.text();
      console.error('Upload error response:', errorText);
      return null;
    }
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;
      let videoUrl = null;

      // Upload files if selected
      if (files.image) {
        imageUrl = await uploadFile(files.image, 'image');
      }
      if (files.video) {
        videoUrl = await uploadFile(files.video, 'video');
      }

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/community/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          imageUrl,
          videoUrl
        })
      });

      if (response.ok) {
        alert('Post created successfully!');
        setFormData({
          title: '',
          content: '',
          problemDescription: '',
          cropType: 'Wheat',
          category: 'Pest',
          state: 'Punjab'
        });
        setFiles({ image: null, video: null });
        setPreview({ image: null, video: null });
        onPostCreated();
      } else {
        alert('Error creating post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-modal">
      <form onSubmit={handleSubmit} className="create-post-form">
        <h2>✍️ Create a New Post</h2>

        <div className="form-group">
          <label>Post Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What's your question or experience?"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Describe your farming question or experience..."
            required
            rows="4"
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label>🚨 Problem Description (Optional)</label>
          <textarea
            name="problemDescription"
            value={formData.problemDescription}
            onChange={handleChange}
            placeholder="Describe the problem in detail. This helps others provide better solutions..."
            rows="3"
            className="form-textarea"
          />
        </div>

        <div className="file-upload-section">
          <div className="file-upload-group">
            <label>📷 Upload Image (Optional)</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
            {preview.image && (
              <div className="preview-container">
                <img src={preview.image} alt="Preview" className="preview-image" />
                <button
                  type="button"
                  onClick={() => {
                    setFiles(prev => ({ ...prev, image: null }));
                    setPreview(prev => ({ ...prev, image: null }));
                  }}
                  className="remove-preview"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="file-upload-group">
            <label>🎥 Upload Video (Optional)</label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleFileChange}
              className="file-input"
            />
            {preview.video && (
              <div className="preview-container">
                <video src={preview.video} className="preview-video" controls />
                <button
                  type="button"
                  onClick={() => {
                    setFiles(prev => ({ ...prev, video: null }));
                    setPreview(prev => ({ ...prev, video: null }));
                  }}
                  className="remove-preview"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Crop Type *</label>
            <select
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              className="form-select"
            >
              {cropTypes.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>State *</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="form-select"
            >
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? '⏳ Creating...' : '📤 Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;