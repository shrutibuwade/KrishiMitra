
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post, onPostsChanged }) => {
  const [translatedContent, setTranslatedContent] = useState(null);
  const [translatedTitle, setTranslatedTitle] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const [isLiking, setIsLiking] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);  // ✅ ADD THIS
  const [followerCount, setFollowerCount] = useState(0);
  const navigate = useNavigate();

  // ✅ GET CURRENT USER & CHECK IF POST OWNER
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isPostOwner = currentUser && post.user && currentUser.email === post.user.email;

  // ✅ DEBUG LOG
console.log('Current User:', currentUser);
console.log('Post User:', post.user);
console.log('Is Post Owner?:', isPostOwner);

console.log('Post User Keys:', Object.keys(post.user || {}));  // ✅ ADD THIS
console.log('Post User Name:', post.user?.name);
console.log('Post User Username:', post.user?.username);
console.log('Full Post Object:', post);  // ✅ SEE EVERYTHING

  useEffect(() => {
    checkFollowStatus();
  }, [post.user.id]);
  
  const handleTranslate = async () => {
  console.log('🔘 Translate button clicked');
  console.log('📍 Current language:', i18n.language);
  console.log('👁️ Show translation:', showTranslation);
  
  if (i18n.language !== 'hi') {
    console.log('⚠️ Not Hindi language');
    setShowTranslation(false);
    return;
  }

  if (showTranslation) {
    console.log('↩️ Toggling off translation');
    setShowTranslation(false);
    return;
  }

  if (translatedContent) {
    console.log('✅ Using cached translation');
    setShowTranslation(true);
    return;
  }

  console.log('⏳ Starting translation...');
  setIsTranslating(true);
  try {
    console.log('📝 Post title:', post.title);
    console.log('📄 Post content:', post.content);
    
    const titleTranslation = await translateToHindi(post.title);
    console.log('✅ Title translated:', titleTranslation);
    setTranslatedTitle(titleTranslation);

    const contentTranslation = await translateToHindi(post.content);
    console.log('✅ Content translated:', contentTranslation);
    setTranslatedContent(contentTranslation);

    setShowTranslation(true);
    console.log('✅ Translation complete');
  } catch (error) {
    console.error('❌ Translation error:', error);
    alert('Translation failed');
  } finally {
    setIsTranslating(false);
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

      console.log('Follow status response:', response.status);

      if (response.status === 401) {
        console.log('Unauthorized - token might be invalid');
        localStorage.removeItem('token');
        return;
      }

      if (!response.ok) {
        console.error('Error response:', response.status);
        return;
      }

      const data = await response.json();
      console.log('Follow data:', data);
      
      setIsFollowing(data.isFollowing || false);
      setFollowerCount(data.followersCount || 0);
    } catch (error) {
      console.error('Error checking follow status:', error);
    }
  };

  const handleLike = async () => {
    setIsLiking(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:8080/api/community/posts/${post.id}/like`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        onPostsChanged(0);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleFollow = async () => {
  try {
    const token = localStorage.getItem('token');
    
    // ✅ DEBUG: Check if token exists
    console.log('Token exists?:', !!token);
    console.log('Token:', token?.substring(0, 50) + '...');
    
    if (!token || token === 'null' || token === '') {
      alert('Please login again to follow users');
      return;
    }

    const method = isFollowing ? 'DELETE' : 'POST';
    
    console.log('Follow request:', {
      url: `http://localhost:8080/api/community/follow/${post.user.id}`,
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const response = await fetch(
      `http://localhost:8080/api/community/follow/${post.user.id}`,
      {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Follow response status:', response.status);

    if (response.status === 401) {
      alert('Session expired. Please login again');
      localStorage.removeItem('token');
      return;
    }

    if (response.ok) {
      const data = await response.json();
      setIsFollowing(data.isFollowing);
      console.log('Follow successful:', data);
    } else {
      const errorData = await response.json();
      console.error('Follow error:', errorData);
      alert('Error: ' + (errorData.error || 'Could not follow user'));
    }
  } catch (error) {
    console.error('Follow request error:', error);
    alert('Connection error: ' + error.message);
  }
};

  // ✅ ADD DELETE HANDLER
  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:8080/api/community/posts/${post.id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        alert('Post deleted successfully!');
        onPostsChanged(0);  // Refresh posts
      } else {
        alert('Error deleting post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleShare = () => {
    const shareText = `Check out this farming post: ${post.title}`;
    const shareUrl = `${window.location.origin}/community/post/${post.id}`;

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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="post-card">
      {/* POST HEADER */}
      <div className="post-header">
        <div className="post-author">
          <div className="author-avatar">👨‍🌾</div>
          <div className="author-info">
           <h3 className="author-name">
  {post.user.name && post.user.name.trim() 
    ? post.user.name 
    : (post.user.username || 'Farmer')}
</h3>
            <p className="author-meta">
              {post.user.state || 'India'} • {post.user.postsCount} posts • {followerCount} followers
            </p>
          </div>
        </div>
         {!isPostOwner && (
        <button
          className={`follow-btn ${isFollowing ? 'following' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            handleFollow();
          }}
        >
          {isFollowing ? '✓ Following' : '+ Follow'}
        </button>
         )}
      </div>

      <div className="post-date">{formatDate(post.createdAt)}</div>

      {/* POST CONTENT - CLICKABLE */}
      <div 
        className="post-content"
        onClick={() => navigate(`/community/post/${post.id}`)}
        style={{ cursor: 'pointer' }}
      >
        <h2 className="post-title">{post.title}</h2>
        <p className="post-body">{post.content}</p>

        {post.problemDescription && (
          <div className="problem-description">
            <h4>🚨 Problem:</h4>
            <p>{post.problemDescription}</p>
          </div>
        )}
      </div>

      {/* MEDIA */}
      {(post.imageUrl || post.videoUrl) && (
        <div className="post-media">
          {post.imageUrl && (
            <img 
              src={`http://localhost:8080${post.imageUrl}`}
              alt="Post media" 
              className="post-image"
              onClick={() => navigate(`/community/post/${post.id}`)}
              style={{ cursor: 'pointer' }}
            />
          )}
          {post.videoUrl && (
            <video 
              src={`http://localhost:8080${post.videoUrl}`}
              className="post-video" 
              controls 
            />
          )}
        </div>
      )}

      {/* POST TAGS */}
      <div className="post-tags">
        <span className="tag crop-tag">🌾 {post.cropType}</span>
        <span className="tag category-tag">🏷️ {post.category}</span>
        <span className="tag state-tag">📍 {post.state}</span>
      </div>

      {/* POST ACTIONS */}
      <div className="post-actions">
        <button 
          className={`action-btn like-btn ${post.isLikedByMe ? 'liked' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }}
          disabled={isLiking}
        >
          ❤️ {post.likesCount} Likes
        </button>
        <button 
          className="action-btn comment-btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/community/post/${post.id}`);
          }}
        >
          💬 {post.commentsCount} Comments
        </button>
        <button 
          className="action-btn share-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleShare();
          }}
        >
          📤 Share
        </button>

        {/* ✅ DELETE BUTTON - ONLY FOR POST OWNER */}
        {isPostOwner && (
          <button 
            className="action-btn delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleDeletePost();
            }}
            disabled={isDeleting}
          >
            {isDeleting ? '⏳ Deleting...' : '🗑️ Delete'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;