package com.customersservice.backend.models.enums;

import java.util.Arrays;
import java.util.Optional;

public enum ContractTerm {
    THREE_MONTH(0),
    SIX_MONTH(1),
    ONE_YEAR(2),
    TWO_YEAR(3),
    THREE_YEAR(4);

    private final Integer id;

    ContractTerm(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public static Optional<ContractTerm> valueOf(int value) {
        return Arrays.stream(values())
            .filter(term -> term.id == value)
            .findFirst();
    }
}
