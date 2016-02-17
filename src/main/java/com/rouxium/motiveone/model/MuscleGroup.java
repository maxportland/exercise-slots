package com.rouxium.motiveone.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Document
public class MuscleGroup {
    @Id
    private String id;
    @Indexed
    private MuscleRegion region;
    private String name;
    public String getRegion() {
        if(region == null) {
            return "";
        }
        return region.getLabel();
    }
}
