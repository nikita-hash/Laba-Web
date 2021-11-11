package com.customersservice.backend.repositories;

import com.customersservice.backend.models.Operation;

import org.springframework.data.repository.CrudRepository;

public interface OperationRepository extends CrudRepository<Operation, Integer> {
    
}
