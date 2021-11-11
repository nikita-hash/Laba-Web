package com.customersservice.backend.models;

import javax.persistence.*;

import lombok.Data;

@Data
@Entity(name = "com.customersservice.backend.models.MarialStatus")
@Table(name = "marialstatus")
public class MarialStatus {

  @Id
  @Column(name = "StatusId", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer statusId;

  @Column(name = "StatusName", nullable = true)
  private String statusName;
}