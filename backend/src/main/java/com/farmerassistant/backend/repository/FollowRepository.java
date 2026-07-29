package com.farmerassistant.backend.repository;

import com.farmerassistant.backend.model.Follow;
import com.farmerassistant.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    Follow findByFollowerAndFollowing(User follower, User following);
    void deleteByFollowerAndFollowing(User follower, User following);
    Long countByFollowing(User user);
    Long countByFollower(User user);
    boolean existsByFollowerAndFollowing(User follower, User following);
}