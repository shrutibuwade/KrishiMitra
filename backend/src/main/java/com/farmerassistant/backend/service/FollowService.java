package com.farmerassistant.backend.service;

import com.farmerassistant.backend.model.Follow;
import com.farmerassistant.backend.model.User;
import com.farmerassistant.backend.repository.FollowRepository;
import com.farmerassistant.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FollowService {

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private UserRepository userRepository;

    // Follow a farmer
    public void followUser(Long followerId, Long followingId) {
        User follower = userRepository.findById(followerId).orElseThrow();
        User following = userRepository.findById(followingId).orElseThrow();

        if (!followRepository.existsByFollowerAndFollowing(follower, following)) {
            Follow follow = new Follow();
            follow.setFollower(follower);
            follow.setFollowing(following);
            followRepository.save(follow);
        }
    }

    // Unfollow a farmer
    public void unfollowUser(Long followerId, Long followingId) {
        User follower = userRepository.findById(followerId).orElseThrow();
        User following = userRepository.findById(followingId).orElseThrow();

        followRepository.deleteByFollowerAndFollowing(follower, following);
    }

    // Check if user is following
    public boolean isFollowing(Long followerId, Long followingId) {
        User follower = userRepository.findById(followerId).orElseThrow();
        User following = userRepository.findById(followingId).orElseThrow();

        return followRepository.existsByFollowerAndFollowing(follower, following);
    }

    // Get follower count
    public Long getFollowerCount(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return followRepository.countByFollowing(user);
    }

    // Get following count
    public Long getFollowingCount(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return followRepository.countByFollower(user);
    }
}