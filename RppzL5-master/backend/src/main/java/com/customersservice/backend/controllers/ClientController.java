package com.customersservice.backend.controllers;

import java.util.List;

import com.customersservice.backend.models.Client;
import com.customersservice.backend.repositories.ClientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    @GetMapping("/api/client/get")
    public List<Client> getClientList(Model model) {
        return (List<Client>) clientRepository.findAll();
    }

    @GetMapping("/api/client/get/{id}")
    public Client getClientById(@PathVariable(value = "id") Integer id, Model model) {
        return clientRepository.findById(id).get();
    }

    @PostMapping("/api/client/add")
    public Client addClient(@RequestBody Client client, Model model) {
        return clientRepository.save(client);
    }

    @PutMapping("/api/client/edit/{id}")
    public Client editClient(@RequestBody Client newClient, @PathVariable(value = "id") Integer id, Model model) {
        return clientRepository.findById(id)
            .map(client -> {
                client.setSurname(newClient.getSurname());
                client.setFirstname(newClient.getFirstname());
                client.setPatronymic(newClient.getPatronymic());
                client.setDateOfBirth(newClient.getDateOfBirth());
                client.setPassportSeries(newClient.getPassportSeries());
                client.setPassportNumber(newClient.getPassportNumber());
                client.setPassportIssuedBy(newClient.getPassportIssuedBy());
                client.setPassportDateOfIssue(newClient.getPassportDateOfIssue());
                client.setIdNumber(newClient.getIdNumber());
                client.setPlaceOfBirth(newClient.getPlaceOfBirth());
                client.setAddressOfTheActualResidence(newClient.getAddressOfTheActualResidence());
                client.setHomePhone(newClient.getHomePhone());
                client.setMobilePhone(newClient.getMobilePhone());
                client.setEmail(newClient.getEmail());
                client.setPlaceOfWork(newClient.getPlaceOfWork());
                client.setPosition(newClient.getPosition());
                client.setPlaceOfResidence(newClient.getPlaceOfResidence());
                client.setRetiree(newClient.getRetiree());
                client.setMonthlyIncome(newClient.getMonthlyIncome());
                client.setCityOfActualResidenceId(newClient.getCityOfActualResidenceId());
                client.setMarialStatusId(newClient.getMarialStatusId());
                client.setCitizenshipId(newClient.getCitizenshipId());
                client.setDisabilityId(newClient.getDisabilityId());
                return clientRepository.save(client);
            })
            .orElseGet(() -> {
                newClient.setId(id);
                return clientRepository.save(newClient);
            });
    } 

    @DeleteMapping("/api/client/delete/{id}")
    public Client deleteClient(@PathVariable(value = "id") Integer id, Model model) {
        var client = clientRepository.findById(id).get();
        clientRepository.delete(client);

        return client;
    }
}
