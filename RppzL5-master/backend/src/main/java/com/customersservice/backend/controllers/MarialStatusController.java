package com.customersservice.backend.controllers;

import java.util.List;

import com.customersservice.backend.models.MarialStatus;
import com.customersservice.backend.repositories.MarialStatusRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class MarialStatusController {
    
    @Autowired
    private MarialStatusRepository marialStatusRepository;

    @GetMapping("api/marialStatus/get")
    public List<MarialStatus> getMarialStatusList(Model model) {
        return (List<MarialStatus>)marialStatusRepository.findAll();
    }
}
