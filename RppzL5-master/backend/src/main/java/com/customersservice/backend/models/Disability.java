package com.customersservice.backend.models;

import javax.persistence.*;

import lombok.Data;

@Data
@Entity(name = "com.customersservice.backend.models.Disability")
@Table(name = "disability")
public class Disability {

  @Id
  @Column(name = "DisabilityId", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer disabilityId;

  @Column(name = "DisabilityName", nullable = true)
  private String disabilityName;
}