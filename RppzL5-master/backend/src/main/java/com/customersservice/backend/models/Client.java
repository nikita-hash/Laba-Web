package com.customersservice.backend.models;

import java.sql.*;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "com.customersservice.backend.models.Client")
@Table(name = "client")
@NoArgsConstructor
@Getter @Setter
@ToString(exclude = {"bankAccounts", "operations"})
public class Client {

  @Id
  @Column(name = "Id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "Surname", nullable = false)
  private String surname;

  @Column(name = "Firstname", nullable = false)
  private String firstname;

  @Column(name = "Patronymic", nullable = false)
  private String patronymic;

  @Column(name = "DateOfBirth", nullable = false)
  private Date dateOfBirth;

  @Column(name = "PassportSeries", nullable = false)
  private String passportSeries;

  @Column(name = "PassportNumber", nullable = false)
  private String passportNumber;

  @Column(name = "PassportIssuedBy", nullable = false)
  private String passportIssuedBy;

  @Column(name = "PassportDateOfIssue", nullable = false)
  private Date passportDateOfIssue;

  @Column(name = "IdNumber", nullable = false)
  private String idNumber;

  @Column(name = "PlaceOfBirth", nullable = false)
  private String placeOfBirth;

  @Column(name = "AddressOfTheActualResidence", nullable = false)
  private String addressOfTheActualResidence;

  @Column(name = "HomePhone", nullable = true)
  private String homePhone;

  @Column(name = "MobilePhone", nullable = true)
  private String mobilePhone;

  @Column(name = "Email", nullable = true)
  private String email;

  @Column(name = "PlaceOfWork", nullable = true)
  private String placeOfWork;

  @Column(name = "Position", nullable = true)
  private String position;

  @Column(name = "PlaceOfResidence", nullable = false)
  private String placeOfResidence;

  @Column(name = "Retiree", nullable = false)
  private Byte retiree;

  @Column(name = "MonthlyIncome", nullable = true)
  private java.math.BigDecimal monthlyIncome;

  @Column(name = "CityOfActualResidenceId", nullable = false)
  private Integer cityOfActualResidenceId;

  @Column(name = "MarialStatusId", nullable = false)
  private Integer marialStatusId;

  @Column(name = "CitizenshipId", nullable = false)
  private Integer citizenshipId;

  @Column(name = "DisabilityId", nullable = false)
  private Integer disabilityId;

  @JsonIgnore
  @ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "client_bankaccount", 
				joinColumns = @JoinColumn(name = "ClientId"), 
				inverseJoinColumns = @JoinColumn(name = "AccountId"))
  private Set<BankAccount> bankAccounts = new HashSet<>();

  @JsonIgnore
  @ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "client_operation", 
				joinColumns = @JoinColumn(name = "ClientId"), 
				inverseJoinColumns = @JoinColumn(name = "OperationId"))
  private Set<Operation> operations = new HashSet<>();
}