import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Community.css';
import Comments from '../components/Community/Comments.jsx';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);  // ✅ ADD THIS
  const navigate = useNavigate();

  // ✅ GET CURRENT USER & CHECK IF POST OWNER
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isPostOwner = currentUser && post && post.user && currentUser.email === post.user.email;

  // DEBUG LOGS
console.log('Current User Email:', currentUser?.email);
console.log('Post User Email:', post?.user?.email);
console.log('Are they equal?:', currentUser?.email === post?.user?.email);
console.log('Is Post Owner?:', isPostOwner);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (post) {
      checkFollowStatus();
    }
  }, [post]);

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:8080/api/community/posts/${postId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const data = await response.json();
      console.log('Post Detail Data:', data);
      console.log('Post User:', data.user);
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkFollowStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.log('No token found');
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/community/follow/check/${post.user.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 401) {
        localStorage.removeItem('token');
        return;
      }

      if (!response.ok) return;

      const data = await response.json();
      setIsFollowing(data.isFollowing);
    } catch (error) {
      console.error('Error checking follow status:', error);
    }
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:8080/api/community/posts/${postId}/like`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        fetchPost();
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem('token');
      const method = isFollowing ? 'DELETE' : 'POST';
      const response = await fetch(
        `http://localhost:8080/api/community/follow/${post.user.id}`,
        {
          method: method,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        setIsFollowing(!isFollowing);
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleShare = () => {
    const shareText = `Check out this farming post: ${post.title}`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: shareText,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  // ✅ ADD DELETE FUNCTION
  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post? This cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:8080/api/community/posts/${postId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        alert('Post deleted successfully!');
        navigate('/community');
      } else {
        alert('Error deleting post. You can only delete your own posts.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!post) return <div className="error">Post not found</div>;

  return (
    <div className="post-detail-page">
      <button className="back-btn" onClick={() => navigate('/community')}>
        ← Back to Community
      </button>

      <div className="post-detail-container">
        {/* POST */}
        <div className="post-detail">
          <div className="post-header-detail">
            <div className="post-author">
              <div className="author-avatar">👨‍🌾</div>
              <div className="author-info">
                <h3>{post.user.name}</h3>
                <p>{post.user.state} • {formatDate(post.createdAt)}</p>
              </div>
            </div>
            <div className="post-actions-header">
               {!isPostOwner && (
              <button
                className={`follow-btn-detail ${isFollowing ? 'following' : ''}`}
                onClick={handleFollow}
              >
                {isFollowing ? '✓ Following' : '+ Follow'}
              </button>
               )}
              
              {/* ✅ ADD DELETE BUTTON */}
              {isPostOwner && (
              <button 
                className="delete-btn-header"
                onClick={handleDeletePost}
                disabled={isDeleting}
              >
                {isDeleting ? '⏳...' : '🗑️ Delete'}
              </button>
              )}
            </div>
          </div>

          <h1 className="post-title">{post.title}</h1>

          <div className="post-tags">
            <span className="tag">🌾 {post.cropType}</span>
            <span className="tag">🏷️ {post.category}</span>
            <span className="tag">📍 {post.state}</span>
          </div>

          <div className="post-content">
            <p>{post.content}</p>

            {post.problemDescription && (
              <div className="problem-section">
                <h3>🚨 Problem Description:</h3>
                <p>{post.problemDescription}</p>
              </div>
            )}
          </div>

          {/* MEDIA */}
          {(post.imageUrl || post.videoUrl) && (
            <div className="post-media-detail">
              {post.imageUrl && (
                <img 
                  src={`http://localhost:8080${post.imageUrl}`}
                  alt="Post media" 
                  className="post-image-detail" 
                />
              )}
              {post.videoUrl && (
                <video 
                  src={`http://localhost:8080${post.videoUrl}`}
                  className="post-video-detail" 
                  controls 
                />
              )}
            </div>
          )}

          <div className="post-stats">
            <button 
              className={`stat-btn ${post.isLikedByMe ? 'liked' : ''}`}
              onClick={handleLike}
            >
              ❤️ {post.likesCount}
            </button>
            <span className="stat">💬 {post.commentsCount}</span>
            <button 
              className="stat-btn"
              onClick={handleShare}
            >
              📤 Share
            </button>
          </div>
        </div>

        {/* COMMENTS - SOLUTIONS */}
        <Comments postId={postId} />
      </div>
    </div>
  );
};

export default PostDetail;