package com.rouxium.motiveone.repository;

import com.rouxium.motiveone.domain.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, Long> {
    User findByUsername(String username);
}