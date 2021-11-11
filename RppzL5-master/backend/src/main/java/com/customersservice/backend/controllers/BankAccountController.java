package com.customersservice.backend.controllers;

import java.util.ArrayList;
import java.util.List;

import com.customersservice.backend.models.BankAccount;
import com.customersservice.backend.models.Client;
import com.customersservice.backend.payload.responses.BankAccountResponse;
import com.customersservice.backend.repositories.BankAccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BankAccountController {
    @Autowired
    private BankAccountRepository bankAccountRepository;

    @GetMapping("api/bankAccounts/get")
    public ResponseEntity<?> getBankAccountList(Model model) {
        List<BankAccount> bankAccounts = bankAccountRepository.findAll();
        List<BankAccountResponse> bankAccountResponses = new ArrayList<>();

        for(BankAccount bankAccount : bankAccounts) {
            if (bankAccount.getClients().size() == 0) {
                continue;
            }

            Client client = new ArrayList<>(bankAccount.getClients()).get(0);

            BankAccountResponse bankAccountResponse = new BankAccountResponse();

            bankAccountResponse.setId(bankAccount.getId());
            bankAccountResponse.setType(bankAccount.getType().getId());
            bankAccountResponse.setBalance(bankAccount.getBalance());
            bankAccountResponse.setNumber(bankAccount.getNumber());
            bankAccountResponse.setFirstname(client.getFirstname());
            bankAccountResponse.setSurname(client.getSurname());
            bankAccountResponse.setPatronymic(client.getPatronymic());

            bankAccountResponses.add(bankAccountResponse);
        }

        return ResponseEntity.ok(bankAccountResponses);
    }
}
