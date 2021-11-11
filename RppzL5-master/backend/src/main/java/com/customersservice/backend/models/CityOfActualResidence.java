package com.customersservice.backend.models;

import javax.persistence.*;

import lombok.Data;

@Data
@Entity(name = "com.customersservice.backend.models.CityOfActualResidence")
@Table(name = "cityofactualresidence")
public class CityOfActualResidence {

  @Id
  @Column(name = "CityId", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer cityId;

  @Column(name = "CityName", nullable = false)
  private String cityName;
}