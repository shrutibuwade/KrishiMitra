import React from 'react';
import PostCard from './PostCard';

const PostList = ({ posts, onPostsChanged }) => {
  return (
    <div className="posts-list">
      {posts.map(post => (
        <PostCard 
          key={post.id} 
          post={post}
          onPostsChanged={onPostsChanged}
        />
      ))}
    </div>
  );
};

export default PostList;