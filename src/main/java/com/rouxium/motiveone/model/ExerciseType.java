package com.rouxium.motiveone.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document
public class ExerciseType {
    @Id
    private String id;
    private String name;
}
