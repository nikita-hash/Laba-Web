package com.customersservice.backend.controllers;

import java.util.List;

import com.customersservice.backend.models.Disability;
import com.customersservice.backend.repositories.DisabilityRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class DisabilityController {
    
    @Autowired
    private DisabilityRepository disabilityRepository;

    @GetMapping("/api/disability/get")
    public List<Disability> getDisabilityList(Model model) {
        return (List<Disability>) disabilityRepository.findAll();
    }
}
