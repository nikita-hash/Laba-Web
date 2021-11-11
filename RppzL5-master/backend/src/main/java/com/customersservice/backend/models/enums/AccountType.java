package com.customersservice.backend.models.enums;

import java.util.Arrays;
import java.util.Optional;

public enum AccountType {
    DEPOSIT_MAIN(0),
    DEPOSIT_PERCENTAGE(1),
    CREDIT_MAIN(2),
    CREDIT_PAY(3);

    private final Integer id;

    AccountType(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public static Optional<AccountType> valueOf(int value) {
        return Arrays.stream(values())
            .filter(type -> type.id == value)
            .findFirst();
    }
}
