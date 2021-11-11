package com.customersservice.backend.repositories;

import com.customersservice.backend.models.Client;

import org.springframework.data.repository.CrudRepository;

public interface ClientRepository extends CrudRepository<Client, Integer> {
    
}
