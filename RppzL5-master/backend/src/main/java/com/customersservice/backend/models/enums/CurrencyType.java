package com.customersservice.backend.models.enums;

import java.util.Arrays;
import java.util.Optional;

public enum CurrencyType {
    BYN(0),
    USD(1),
    EUR(2);

    private final Integer id;

    CurrencyType(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public static Optional<CurrencyType> valueOf(int value) {
        return Arrays.stream(values())
            .filter(type -> type.id == value)
            .findFirst();
    }
}
