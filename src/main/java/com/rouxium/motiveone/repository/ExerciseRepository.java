package com.rouxium.motiveone.repository;

import com.rouxium.motiveone.model.Exercise;
import com.rouxium.motiveone.model.MuscleHead;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ExerciseRepository extends MongoRepository<Exercise, String> {
    List<Exercise> findByMusclesWorkedIn(List<MuscleHead> muscleHead);
}
