package com.customersservice.backend.controllers;

import java.util.List;

import com.customersservice.backend.models.Citizenship;
import com.customersservice.backend.repositories.CitizenshipRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class CitizenshipController {

    @Autowired
    private CitizenshipRepository citizenshipRepository;

    @GetMapping("/api/citizenship/get")
    public List<Citizenship> getCitizenshipList(Model model) {
        return (List<Citizenship>)citizenshipRepository.findAll();
    }
}
