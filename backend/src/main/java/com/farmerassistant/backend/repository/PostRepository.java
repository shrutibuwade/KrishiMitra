package com.farmerassistant.backend.repository;

import com.farmerassistant.backend.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.farmerassistant.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findByOrderByCreatedAtDesc(Pageable pageable);
    Page<Post> findByCropType(String cropType, Pageable pageable);
    Page<Post> findByState(String state, Pageable pageable);
    Page<Post> findByCategory(String category, Pageable pageable);
    Page<Post> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    Page<Post> findByCropTypeAndStateAndCategory(String cropType, String state, String category, Pageable pageable);
    Page<Post> findByUser(User user, Pageable pageable);
    Long countByUserId(Long userId);
}