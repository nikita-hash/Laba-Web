package com.customersservice.backend.repositories;

import com.customersservice.backend.models.Disability;

import org.springframework.data.repository.CrudRepository;

public interface DisabilityRepository extends CrudRepository<Disability, Integer> {
    
}
