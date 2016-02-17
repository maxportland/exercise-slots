package com.rouxium.motiveone.repository;

import com.rouxium.motiveone.model.ExerciseType;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExerciseTypeRepository extends MongoRepository<ExerciseType, String> {
}
