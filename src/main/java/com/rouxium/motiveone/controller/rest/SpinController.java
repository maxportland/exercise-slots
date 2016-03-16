package com.rouxium.motiveone.controller.rest;

import com.rouxium.motiveone.model.Exercise;
import com.rouxium.motiveone.model.MuscleHead;
import com.rouxium.motiveone.model.MuscleRegion;
import com.rouxium.motiveone.repository.ExerciseRepository;
import com.rouxium.motiveone.repository.ExerciseTypeRepository;
import com.rouxium.motiveone.repository.MuscleGroupRepository;
import com.rouxium.motiveone.repository.MuscleHeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/spin")
public class SpinController {

    @Autowired
    ExerciseRepository exerciseRepository;

    @Autowired
    MuscleHeadRepository muscleHeadRepository;

    @Autowired
    MuscleGroupRepository muscleGroupRepository;

    @Autowired
    ExerciseTypeRepository exerciseTypeRepository;

    @RequestMapping(method = RequestMethod.GET)
    LinkedHashSet<Exercise> spinForRegions(@RequestParam(required=false) List<String> regions) {
        List<MuscleHead> muscleHeads = new ArrayList<>();
        List<Exercise> exercises;
        if(regions != null && !regions.isEmpty()) {
            regions.stream()
                    .map(region -> muscleGroupRepository.findAllByRegion(MuscleRegion.forLabel(region)))
                    .map(muscleGroups -> muscleGroups.stream().map(muscleGroup -> muscleHeadRepository.findAllByMuscleGroup(muscleGroup)).collect(Collectors.toList()))
                    .forEach(muscleHeadListList -> muscleHeadListList.stream().forEach(muscleHeadList -> muscleHeadList.stream().forEach(muscleHeads::add)));
            exercises = exerciseRepository.findByMusclesWorkedIn(muscleHeads);
        } else {
            exercises = exerciseRepository.findAll();
        }
        Collections.shuffle(exercises, new Random(System.nanoTime()));
        if(exercises.size() <= 5) {
            return new LinkedHashSet<>(exercises);
        }
        return new LinkedHashSet<>(exercises.subList(0, 5));
    }

    @RequestMapping("/one")
    Exercise getOne() {
        List<Exercise> exercises = exerciseRepository.findAll();
        Collections.shuffle(exercises, new Random(System.nanoTime()));
        return exercises.get(0);
    }

}
