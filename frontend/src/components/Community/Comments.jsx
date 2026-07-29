import React, { useState, useEffect } from 'react';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:8080/api/community/comments/post/${postId}?page=0&size=20`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const data = await response.json();
      setComments(data.content || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:8080/api/community/comments/post/${postId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ content: newComment })
        }
      );

      if (response.ok) {
        setNewComment('');
        fetchComments();
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:8080/api/community/comments/${commentId}/like`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="comments-section">
      <h2>💬 Comments ({comments.length})</h2>

      {/* ADD COMMENT */}
      <form onSubmit={handleAddComment} className="add-comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          rows="3"
          className="comment-textarea"
        />
        <button 
          type="submit" 
          className="comment-submit-btn"
          disabled={submitting}
        >
          {submitting ? '⏳ Posting...' : '📤 Post Comment'}
        </button>
      </form>

      {/* COMMENTS LIST */}
      {loading ? (
        <div className="loading">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="no-comments">
          <p>No comments yet. Be the first to reply!</p>
        </div>
      ) : (
        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <div className="comment-author">
                <div className="avatar">👨‍🌾</div>
                <div className="author-info">
                  <h4>{comment.user.name}</h4>
                  <p>{formatDate(comment.createdAt)}</p>
                </div>
              </div>

              <div className="comment-content">
                <p>{comment.content}</p>
              </div>

              <div className="comment-actions">
                <button 
                  className={`like-btn ${comment.isLikedByMe ? 'liked' : ''}`}
                  onClick={() => handleLikeComment(comment.id)}
                >
                  ❤️ {comment.likesCount}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;