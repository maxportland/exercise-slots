package com.rouxium.motiveone.controller;

import com.google.common.collect.ImmutableMap;
import com.rouxium.motiveone.model.*;
import com.rouxium.motiveone.repository.ExerciseRepository;
import com.rouxium.motiveone.repository.ExerciseTypeRepository;
import com.rouxium.motiveone.repository.MuscleGroupRepository;
import com.rouxium.motiveone.repository.MuscleHeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    ExerciseRepository exerciseRepository;

    @Autowired
    MuscleHeadRepository muscleHeadRepository;

    @Autowired
    MuscleGroupRepository muscleGroupRepository;

    @Autowired
    ExerciseTypeRepository exerciseTypeRepository;

    @RequestMapping(value="/exercise", method= RequestMethod.POST)
    Exercise addExercise(@RequestBody Exercise exercise) {
        return exerciseRepository.save(exercise);
    }

    @RequestMapping(value="/exercise", method= RequestMethod.PUT)
    Exercise updateExercise(@RequestBody Exercise exercise) {
        return exerciseRepository.save(exercise);
    }

    @RequestMapping(value="/exercise", method= RequestMethod.DELETE)
    HttpStatus deleteExercise(@RequestBody Exercise exercise) {
        exerciseRepository.delete(exercise);
        return HttpStatus.OK;
    }

    @RequestMapping(value="/exercise/{id}", method= RequestMethod.GET)
    Exercise getExercise(@PathVariable String id) {
        return exerciseRepository.findOne(id);
    }

    @RequestMapping(value="/exercise", method= RequestMethod.GET)
    List<Exercise> listExercises() {
        return exerciseRepository.findAll();
    }

    @RequestMapping(value="/muscle-regions", method= RequestMethod.GET)
    List<Map<String, String>> getMuscleRegions() {
        return Arrays.stream(MuscleRegion.values()).map(region -> ImmutableMap.of("label", region.getLabel())).collect(Collectors.toList());
    }

    @RequestMapping(value="/muscle-groups", method= RequestMethod.GET)
    List<MuscleGroup> getMuscleGroups() {
        return muscleGroupRepository.findAll();
    }

    @RequestMapping(value="/muscle-group", method= RequestMethod.POST)
    MuscleGroup saveMuscleGroup(@RequestBody MuscleGroup muscleGroup) {
        return muscleGroupRepository.save(muscleGroup);
    }

    @RequestMapping(value="/muscle-group", method= RequestMethod.PUT)
    MuscleGroup updateMuscleGroup(@RequestBody MuscleGroup muscleGroup) {
        return muscleGroupRepository.save(muscleGroup);
    }

    @RequestMapping(value="/muscle-group", method= RequestMethod.DELETE)
    HttpStatus deleteMuscleGroup(@RequestBody MuscleGroup muscleGroup) {
        muscleGroupRepository.delete(muscleGroup);
        return HttpStatus.OK;
    }

    @RequestMapping(value="/exercise-types", method= RequestMethod.GET)
    List<ExerciseType> getExerciseTypes() {
        return exerciseTypeRepository.findAll();
    }

    @RequestMapping(value="/exercise-type", method= RequestMethod.POST)
    ExerciseType saveMuscleGroup(@RequestBody ExerciseType exerciseType) {
        return exerciseTypeRepository.save(exerciseType);
    }

    @RequestMapping(value="/exercise-type", method= RequestMethod.DELETE)
    HttpStatus deleteMuscleGroup(@RequestBody ExerciseType exerciseType) {
        exerciseTypeRepository.delete(exerciseType);
        return HttpStatus.OK;
    }

    @RequestMapping(value="/muscle-groups/{region}", method= RequestMethod.GET)
    List<MuscleGroup> getMuscleGroups(@PathVariable String region) {
        return muscleGroupRepository.findAllByRegion(MuscleRegion.forLabel(region));
    }

    @RequestMapping(value="/muscle-heads", method= RequestMethod.GET)
    List<MuscleHead> getMuscleHeads() {
        return muscleHeadRepository.findAll();
    }

    @RequestMapping(value="/muscle-head", method= RequestMethod.POST)
    MuscleHead saveMuscleHead(@RequestBody MuscleHead muscleHead) {
        return muscleHeadRepository.save(muscleHead);
    }

    @RequestMapping(value="/muscle-head", method= RequestMethod.PUT)
    MuscleHead updateMuscleHead(@RequestBody MuscleHead muscleHead) {
        return muscleHeadRepository.save(muscleHead);
    }

    @RequestMapping(value="/muscle-head", method= RequestMethod.DELETE)
    HttpStatus deleteMuscleHead(@RequestBody MuscleHead muscleHead) {
        muscleHeadRepository.delete(muscleHead);
        return HttpStatus.OK;
    }

    @RequestMapping(value="/muscle-heads/{muscleGroupId}", method= RequestMethod.GET)
    List<MuscleHead> getMuscleHeads(@PathVariable String muscleGroupId) {
        MuscleGroup muscleGroup = muscleGroupRepository.findOne(muscleGroupId);
        return muscleHeadRepository.findAllByMuscleGroup(muscleGroup);
    }

}
