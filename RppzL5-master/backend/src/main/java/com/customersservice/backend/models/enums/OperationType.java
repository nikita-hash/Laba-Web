package com.customersservice.backend.models.enums;

import java.util.Arrays;
import java.util.Optional;

public enum OperationType {
    DEMAND_DEPOSIT(0),
    TERM_DEPOSIT(1),
    CREDIT(2);

    private final Integer id;

    OperationType(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public static Optional<OperationType> valueOf(int value) {
        return Arrays.stream(values())
            .filter(type -> type.id == value)
            .findFirst();
    }
}
