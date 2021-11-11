package com.customersservice.backend.payload.requests;

import java.sql.Date;

import lombok.Data;

@Data
public class NewOperationRequest {
    private Integer operationType;
    private Integer contractNumber;
    private Integer currencyType;
    private Date creationDate;
    private Date expireDate;
    private Integer contractTerm;
    private Integer amount;
    private Integer percent;
    private Integer clientId;
}
