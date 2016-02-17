package com.rouxium.motiveone.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Exercise {
    @Id
    private String id;
    private String name;
    @DBRef
    private List<MuscleHead> musclesWorked;
    private String description;
    @DBRef
    private List<ExerciseType> exerciseTypes;
}
