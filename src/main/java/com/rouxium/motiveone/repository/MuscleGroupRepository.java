package com.rouxium.motiveone.repository;

import com.rouxium.motiveone.model.MuscleGroup;
import com.rouxium.motiveone.model.MuscleRegion;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MuscleGroupRepository extends MongoRepository<MuscleGroup, String> {
    List<MuscleGroup> findAllByRegion(MuscleRegion region);
}
