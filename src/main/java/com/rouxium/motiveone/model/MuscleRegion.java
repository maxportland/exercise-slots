package com.rouxium.motiveone.model;

import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

public enum MuscleRegion {
    ARMS("Arms"),
    SHOULDERS("Shoulders"),
    BACK("Back"),
    CORE("Core"),
    LEGS("Legs"),
    CHEST("Chest");
    private String label;
    MuscleRegion(String label) {
        this.label = label;
    }
    @JsonValue
    public String getLabel() {
        return label;
    }
    public static MuscleRegion forLabel(String label) {
        return Arrays.stream(MuscleRegion.values()).filter(status -> status.label.equals(label)).findFirst()
                .orElseThrow(() -> new IllegalStateException(String.format("Unsupported label %s.", label)));
    }
}
