package com.customersservice.backend.controllers;

import java.util.List;

import com.customersservice.backend.models.CityOfActualResidence;
import com.customersservice.backend.repositories.CityOfActualResidenceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class CityOfActualResidenceController {
    
    @Autowired
    private CityOfActualResidenceRepository cityOfActualResidenceRepository;

    @GetMapping("/api/cityOfActualResidence/get")
    public List<CityOfActualResidence> getCityOfActualResidenceList(Model model) {
        return (List<CityOfActualResidence>) cityOfActualResidenceRepository.findAll();
    }
}
