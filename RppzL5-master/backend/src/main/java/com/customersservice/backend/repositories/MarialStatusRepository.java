package com.customersservice.backend.repositories;

import com.customersservice.backend.models.MarialStatus;

import org.springframework.data.repository.CrudRepository;

public interface MarialStatusRepository extends CrudRepository<MarialStatus, Integer> {
    
}
