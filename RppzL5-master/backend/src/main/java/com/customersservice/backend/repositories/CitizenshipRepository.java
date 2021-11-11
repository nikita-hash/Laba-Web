package com.customersservice.backend.repositories;

import com.customersservice.backend.models.Citizenship;

import org.springframework.data.repository.CrudRepository;

public interface CitizenshipRepository extends CrudRepository<Citizenship, Integer> {
    
}
