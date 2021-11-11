package com.customersservice.backend.models;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.customersservice.backend.models.enums.ContractTerm;
import com.customersservice.backend.models.enums.CurrencyType;
import com.customersservice.backend.models.enums.OperationType;

import lombok.Data;

@Data
@Entity
@Table(name = "operation")
public class Operation {
    @Id
    @Column(name = "Id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private OperationType type;

    @Column(name = "CreationDate", nullable = false, columnDefinition="DATETIME DEFAULT CURRENT_TIMESTAMP")
    private Date creationDate;

    @Column(name = "ExpireDate", nullable = false, columnDefinition = "DATETIME")
    private Date expireDate;

    @Column(name = "CurrencyType", nullable = false)
    private CurrencyType currencyType;

    @Column(name = "Percent", nullable = false)
    private Integer percent;

    @Column(name = "ContractTerm", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private ContractTerm contractTerm;

    @Column(name = "ContractNumber", nullable = false)
    private Integer contractNumber;

    @Column(name = "Amount", nullable = false, columnDefinition = "decimal(10,0)")
    private Float amount;

    @Column(name = "DepositMainAccountId")
    private Integer depositMainAccountId;

    @Column(name = "DepositPercentageAccountId")
    private Integer depositPercentageAccountId;

    @Column(name = "CreditMainAccountId")
    private Integer creditMainAccountId;

    @Column(name = "CreditPayAccountId")
    private Integer creditPayAccountId;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable( name = "client_operation",
                joinColumns = {@JoinColumn(name = "OperationId", referencedColumnName = "Id")},
                inverseJoinColumns = {@JoinColumn(name="ClientId", referencedColumnName = "Id")})
    private Set<Client> clients = new HashSet<>();
}
