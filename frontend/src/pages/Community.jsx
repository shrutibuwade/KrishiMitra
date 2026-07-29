import React, { useState, useEffect } from 'react';
import '../styles/Community.css';
import PostList from '../components/Community/PostList.jsx';
import CreatePost from '../components/Community/CreatePost.jsx';

const Community = () => {

  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  const [filters, setFilters] = useState({
    cropType: 'All',
    state: 'All',
    category: 'All',
    searchTerm: ''
  });

  const [showCreatePost, setShowCreatePost] = useState(false);

  const cropTypes = ['All', 'Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize', 'Potato', 'Onion', 'Tomato', 'Pulses'];
  const states = ['All', 'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'];
  const categories = ['All', 'Pest', 'Fertilizer', 'Weather', 'Disease', 'Irrigation', 'Market', 'Equipment', 'Other'];

  // Fetch posts
  const fetchPosts = async (page = 0) => {
    setLoading(true);
    try {
      let url = `http://localhost:8080/api/community/posts?page=${page}&size=10`;

      if (filters.searchQuery) {
        url = `http://localhost:8080/api/community/posts/search?title=${filters.searchQuery}&page=${page}&size=10`;
      } else if (filters.cropType !== 'All' && filters.state !== 'All' && filters.category !== 'All') {
        url = `http://localhost:8080/api/community/posts?page=${page}&size=10`;
      } else if (filters.cropType !== 'All') {
        url = `http://localhost:8080/api/community/posts/crop/${filters.cropType}?page=${page}&size=10`;
      } else if (filters.state !== 'All') {
        url = `http://localhost:8080/api/community/posts/state/${filters.state}?page=${page}&size=10`;
      } else if (filters.category !== 'All') {
        url = `http://localhost:8080/api/community/posts/category/${filters.category}?page=${page}&size=10`;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      setPosts(data.content || []);
      setTotalPages(data.totalPages || 0);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(0);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(0);
  };

  const handleSearchChange = (e) => {
  const value = e.target.value;
  console.log('Search value:', value);  
  setFilters(prev => ({
    ...prev,
    searchTerm: value
  }));
  setPage(0); // Reset to first page
};

  const handlePostCreated = () => {
    setShowCreatePost(false);
    fetchPosts(0);
  };

  return (
    <div className="community-page">
      {/* HEADER */}
      <section className="community-hero">
        <h1> Farmer Community</h1>
      </section>

      {/* CREATE POST BUTTON */}
      <div className="community-container">
        <button 
          className="create-post-btn"
          onClick={() => setShowCreatePost(!showCreatePost)}
        >
          {showCreatePost ? '✕ Close' : '✍️ Create Post'}
        </button>

        {showCreatePost && <CreatePost onPostCreated={handlePostCreated} />}

        {/* FILTERS */}
        <div className="filters-section">
          <div className="filter-group">
            <label>🌱 Crop Type</label>
            <select 
              value={filters.cropType}
              onChange={(e) => handleFilterChange('cropType', e.target.value)}
              className="filter-select"
            >
              {cropTypes.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>📍 State</label>
            <select 
              value={filters.state}
              onChange={(e) => handleFilterChange('state', e.target.value)}
              className="filter-select"
            >
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>🏷️ Category</label>
            <select 
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="filter-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>🔍 Search</label>
            <input 
              type="text"
              placeholder="Search posts..."
              value={filters.searchTerm}
              onChange={handleSearchChange}
              className="filter-input"
            />
          </div>
        </div>

        {/* POSTS LIST */}
        {loading ? (
          <div className="loading">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="no-posts">
            <p>No posts found. Be the first to create one!</p>
          </div>
        ) : (
          <>
            <PostList posts={posts} onPostsChanged={fetchPosts} />

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => fetchPosts(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="pagination-btn"
                >
                  ← Previous
                </button>
                <span className="pagination-info">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <button 
                  onClick={() => fetchPosts(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className="pagination-btn"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Community;