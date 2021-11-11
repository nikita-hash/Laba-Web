package com.customersservice.backend.models;

import javax.persistence.*;

import lombok.Data;

@Data
@Entity
@Table(name = "citizenship")
public class Citizenship {

  @Id
  @Column(name = "CitizenshipId", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer citizenshipId;

  @Column(name = "CitizenshipName", nullable = true)
  private String citizenshipName;
}