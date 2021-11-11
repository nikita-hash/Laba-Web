package com.customersservice.backend.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.customersservice.backend.models.enums.AccountType;

import lombok.Data;

@Data
@Entity
@Table(name = "bankaccount")
public class BankAccount {
    @Id
    @Column(name = "Id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Type", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private AccountType type;

    @Column(name = "Balance", nullable = false, columnDefinition = "decimal(10,0)")
    private Float balance;

    @Column(name = "Number", nullable = false)
    private String number;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable( name = "client_bankaccount",
                joinColumns = {@JoinColumn(name = "AccountId", referencedColumnName = "Id")},
                inverseJoinColumns = {@JoinColumn(name="ClientId", referencedColumnName = "Id")})
    private Set<Client> clients = new HashSet<>();
}
