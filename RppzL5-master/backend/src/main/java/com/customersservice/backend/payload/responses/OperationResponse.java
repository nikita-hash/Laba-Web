package com.customersservice.backend.payload.responses;

import java.sql.Date;

import lombok.Data;

@Data
public class OperationResponse {
    private Integer id;
    private Integer operationType;
    private Date creationDate;
    private Date expireDate;
    private Integer currencyType;
    private Integer percent;
    private Integer contractTerm;
    private Integer contractNumber;
    private Float amount;
    private String firstname;
    private String surname;
    private String patronymic;
    private String depositMainAccountNumber;
    private String depositPercentageAccountNumber;
    private String creditMainAccountNumber;
    private String creditPayAccountNumber;
}
