package com.customersservice.backend.payload.responses;

import lombok.Data;

@Data
public class BankAccountResponse {
    private Integer id;
    private Integer type;
    private Float balance;
    private String number;
    private String firstname;
    private String surname;
    private String patronymic;
}
