package com.rouxium.motiveone.repository;

import com.rouxium.motiveone.model.MuscleGroup;
import com.rouxium.motiveone.model.MuscleHead;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MuscleHeadRepository extends MongoRepository<MuscleHead, String> {
    List<MuscleHead> findAllByMuscleGroup(MuscleGroup muscleGroup);
}
