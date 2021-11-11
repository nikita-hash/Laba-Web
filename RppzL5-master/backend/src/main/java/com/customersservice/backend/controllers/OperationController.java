package com.customersservice.backend.controllers;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import com.customersservice.backend.models.BankAccount;
import com.customersservice.backend.models.Client;
import com.customersservice.backend.models.Operation;
import com.customersservice.backend.models.enums.AccountType;
import com.customersservice.backend.models.enums.ContractTerm;
import com.customersservice.backend.models.enums.CurrencyType;
import com.customersservice.backend.models.enums.OperationType;
import com.customersservice.backend.payload.requests.NewOperationRequest;
import com.customersservice.backend.payload.responses.OperationResponse;
import com.customersservice.backend.repositories.BankAccountRepository;
import com.customersservice.backend.repositories.ClientRepository;
import com.customersservice.backend.repositories.OperationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OperationController {

    @Autowired
    private OperationRepository operationRepository;

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Autowired
    private ClientRepository clientRepository;

    @PostMapping("api/operations/add")
    public ResponseEntity<?> addOperation(@RequestBody NewOperationRequest newOperationRequest, Model model) {
        if (newOperationRequest == null) {
            return ResponseEntity.badRequest().body("Request is null");
        }

        Client client = clientRepository.findById(newOperationRequest.getClientId()).orElse(null);

        if (client == null) {
            return ResponseEntity.badRequest().body("Client not found");
        }

        Set<BankAccount> bankAccounts = client.getBankAccounts();
        if (bankAccounts == null || bankAccounts.isEmpty()) {
            bankAccounts = generateBankAccounts(client);
            clientRepository.save(client);
        }

        OperationType operationType = OperationType.valueOf(newOperationRequest.getOperationType()).orElse(null);

        if (operationType == null) {
            return ResponseEntity.badRequest().body("Operation type not found");
        }

        Operation operation = new Operation();

        client = clientRepository.findById(newOperationRequest.getClientId()).orElse(null);

        if (operationType == OperationType.DEMAND_DEPOSIT) {
            BankAccount depositMainBankAccount = bankAccounts.stream().filter(b -> b.getType().equals(AccountType.DEPOSIT_MAIN)).findFirst().orElse(null);
            BankAccount depositPercentageBankAccount = bankAccounts.stream().filter(b -> b.getType().equals(AccountType.DEPOSIT_PERCENTAGE)).findFirst().orElse(null);

            operation.setClients(Set.of(client));
            operation.setContractNumber(newOperationRequest.getContractNumber());
            operation.setType(OperationType.DEMAND_DEPOSIT);
            operation.setCurrencyType(CurrencyType.valueOf(newOperationRequest.getCurrencyType()).orElse(CurrencyType.BYN));
            operation.setCreationDate(newOperationRequest.getCreationDate());
            operation.setExpireDate(newOperationRequest.getExpireDate());
            operation.setContractTerm(ContractTerm.valueOf(newOperationRequest.getContractTerm()).orElse(ContractTerm.ONE_YEAR));
            operation.setAmount(Float.parseFloat(newOperationRequest.getAmount().toString()));
            operation.setPercent(newOperationRequest.getPercent());
            operation.setDepositMainAccountId(depositMainBankAccount.getId());
            operation.setDepositPercentageAccountId(depositPercentageBankAccount.getId());

            depositMainBankAccount.setBalance(depositMainBankAccount.getBalance() + operation.getAmount());
            bankAccountRepository.save(depositMainBankAccount);
        }
        else if (operationType == OperationType.TERM_DEPOSIT) {
            BankAccount depositMainBankAccount = bankAccounts.stream().filter(b -> b.getType().equals(AccountType.DEPOSIT_MAIN)).findFirst().orElse(null);
            BankAccount depositPercentageBankAccount = bankAccounts.stream().filter(b -> b.getType().equals(AccountType.DEPOSIT_PERCENTAGE)).findFirst().orElse(null);

            operation.setClients(Set.of(client));
            operation.setContractNumber(newOperationRequest.getContractNumber());
            operation.setType(OperationType.TERM_DEPOSIT);
            operation.setCurrencyType(CurrencyType.valueOf(newOperationRequest.getCurrencyType()).orElse(CurrencyType.BYN));
            operation.setCreationDate(newOperationRequest.getCreationDate());
            operation.setExpireDate(newOperationRequest.getExpireDate());
            operation.setContractTerm(ContractTerm.valueOf(newOperationRequest.getContractTerm()).orElse(ContractTerm.ONE_YEAR));
            operation.setAmount(Float.parseFloat(newOperationRequest.getAmount().toString()));
            operation.setPercent(newOperationRequest.getPercent());
            operation.setDepositMainAccountId(depositMainBankAccount.getId());
            operation.setDepositPercentageAccountId(depositPercentageBankAccount.getId());

            depositMainBankAccount.setBalance(depositMainBankAccount.getBalance() + operation.getAmount());
            bankAccountRepository.save(depositMainBankAccount);
        }
        else if (operationType == OperationType.CREDIT) {
            BankAccount creditMainBankAccount = bankAccounts.stream().filter(b -> b.getType().equals(AccountType.CREDIT_MAIN)).findFirst().orElse(null);
            BankAccount creditPayBankAccount = bankAccounts.stream().filter(b -> b.getType().equals(AccountType.CREDIT_PAY)).findFirst().orElse(null);

            operation.setClients(Set.of(client));
            operation.setContractNumber(newOperationRequest.getContractNumber());
            operation.setType(OperationType.CREDIT);
            operation.setCurrencyType(CurrencyType.valueOf(newOperationRequest.getCurrencyType()).orElse(CurrencyType.BYN));
            operation.setCreationDate(newOperationRequest.getCreationDate());
            operation.setExpireDate(newOperationRequest.getExpireDate());
            operation.setContractTerm(ContractTerm.valueOf(newOperationRequest.getContractTerm()).orElse(ContractTerm.ONE_YEAR));
            operation.setAmount(Float.parseFloat(newOperationRequest.getAmount().toString()));
            operation.setPercent(newOperationRequest.getPercent());
            operation.setCreditMainAccountId(creditMainBankAccount.getId());
            operation.setCreditPayAccountId(creditPayBankAccount.getId());

            creditMainBankAccount.setBalance(creditMainBankAccount.getBalance() + operation.getAmount());
            bankAccountRepository.save(creditMainBankAccount);
        }

        operationRepository.save(operation);

        Set<Operation> operations = client.getOperations();
        operations.add(operation);

        client.setOperations(operations);
        clientRepository.save(client);

        return ResponseEntity.ok("Operation successfully added.");
    }

    @GetMapping("api/operations/get")
    public ResponseEntity<?> getOperationList(Model model) {
        List<Operation> operations = (List<Operation>)operationRepository.findAll();
        List<OperationResponse> operationResponses = new ArrayList<>();

        for(Operation operation : operations) {
            Client client = (Client) operation.getClients().toArray()[0];
            OperationResponse operationResponse = new OperationResponse();
            BankAccount depositMainBankAccount = client.getBankAccounts().stream().filter(b -> b.getType() == AccountType.DEPOSIT_MAIN).findFirst().orElse(null);
            BankAccount depositPercentageBankAccount = client.getBankAccounts().stream().filter(b -> b.getType() == AccountType.DEPOSIT_PERCENTAGE).findFirst().orElse(null);
            BankAccount creditMainBankAccount = client.getBankAccounts().stream().filter(b -> b.getType() == AccountType.CREDIT_MAIN).findFirst().orElse(null);
            BankAccount creditPayBankAccount = client.getBankAccounts().stream().filter(b -> b.getType() == AccountType.CREDIT_PAY).findFirst().orElse(null);

            operationResponse.setId(operation.getId());
            operationResponse.setOperationType(operation.getType().getId());
            operationResponse.setCreationDate(operation.getCreationDate());
            operationResponse.setExpireDate(operation.getExpireDate());
            operationResponse.setCurrencyType(operation.getCurrencyType().getId());
            operationResponse.setPercent(operation.getPercent());
            operationResponse.setContractTerm(operation.getContractTerm().getId());
            operationResponse.setContractNumber(operation.getContractNumber());
            operationResponse.setAmount(operation.getAmount());
            operationResponse.setFirstname(client.getFirstname());
            operationResponse.setSurname(client.getSurname());
            operationResponse.setPatronymic(client.getPatronymic());
            operationResponse.setDepositMainAccountNumber(depositMainBankAccount != null ? depositMainBankAccount.getNumber() : null);
            operationResponse.setDepositPercentageAccountNumber(depositPercentageBankAccount != null ? depositPercentageBankAccount.getNumber() : null);
            operationResponse.setCreditMainAccountNumber(creditMainBankAccount != null ? creditMainBankAccount.getNumber() : null);
            operationResponse.setCreditPayAccountNumber(creditPayBankAccount != null ? creditPayBankAccount.getNumber() : null);

            operationResponses.add(operationResponse);
        }

        return ResponseEntity.ok(operationResponses);
    }

    @GetMapping("api/closeDay")
    public ResponseEntity<?> closeDay(Model model) {
        List<Operation> operations = (List<Operation>)operationRepository.findAll();

        for(Operation operation : operations) {
            if (operation.getType() == OperationType.DEMAND_DEPOSIT || operation.getType() == OperationType.TERM_DEPOSIT ) {
                BankAccount depositPercentageBankAccount = bankAccountRepository.findById(operation.getDepositPercentageAccountId()).orElse(null);
             
                if (depositPercentageBankAccount == null) {
                    continue;
                }

                depositPercentageBankAccount.setBalance(depositPercentageBankAccount.getBalance() + (operation.getAmount().floatValue() * (operation.getPercent().floatValue() / 100)));

                bankAccountRepository.save(depositPercentageBankAccount);
            }
            else if (operation.getType() == OperationType.CREDIT) {
                BankAccount creditPayBankAccount = bankAccountRepository.findById(operation.getCreditPayAccountId()).orElse(null);

                if (creditPayBankAccount == null) {
                    continue;
                }

                creditPayBankAccount.setBalance(creditPayBankAccount.getBalance() + (operation.getAmount().floatValue() * (operation.getPercent().floatValue() / 100)));
                
                bankAccountRepository.save(creditPayBankAccount);
            }
        }

        return ResponseEntity.ok(null);
    }

    private Set<BankAccount> generateBankAccounts(Client client) {
        Set<BankAccount> bankAccounts = new HashSet<>();

        BankAccount creditMainBankAccount = new BankAccount();
        creditMainBankAccount.setType(AccountType.CREDIT_MAIN);
        creditMainBankAccount.setBalance(0f);
        creditMainBankAccount.setClients(Set.of(client));

        while(true) {
            String creditMainBankAccountNumber = generateCreditBankAccountNumber();
            BankAccount bankAccount = bankAccountRepository.findAll().stream().filter(b -> b.getNumber().equals(creditMainBankAccountNumber)).findFirst().orElse(null);

            if (bankAccount != null) {
                continue;
            }
            else {
                creditMainBankAccount.setNumber(creditMainBankAccountNumber);
                break;
            }
        }

        BankAccount creditPayBankAccount = new BankAccount();
        creditPayBankAccount.setType(AccountType.CREDIT_PAY);
        creditPayBankAccount.setBalance(0f);
        creditPayBankAccount.setClients(Set.of(client));

        while(true) {
            String creditPayBankAccountNumber = generateCreditBankAccountNumber();
            BankAccount bankAccount = bankAccountRepository.findAll().stream().filter(b ->  b.getNumber().equals(creditPayBankAccountNumber)).findFirst().orElse(null);

            if (bankAccount != null) {
                continue;
            }
            else {
                creditPayBankAccount.setNumber(creditPayBankAccountNumber);
                break;
            }
        }

        BankAccount depositMainBankAccount = new BankAccount();
        depositMainBankAccount.setType(AccountType.DEPOSIT_MAIN);
        depositMainBankAccount.setBalance(0f);
        depositMainBankAccount.setClients(Set.of(client));

        while(true) {
            String depositMainBankAccountNumber = generateDepositBankAccountNumber();
            BankAccount bankAccount = bankAccountRepository.findAll().stream().filter(b -> b.getNumber().equals(depositMainBankAccountNumber)).findFirst().orElse(null);

            if (bankAccount != null) {
                continue;
            }
            else {
                depositMainBankAccount.setNumber(depositMainBankAccountNumber);
                break;
            }
        }


        BankAccount depositPercentageBankAccount = new BankAccount();
        depositPercentageBankAccount.setType(AccountType.DEPOSIT_PERCENTAGE);
        depositPercentageBankAccount.setBalance(0f);
        depositPercentageBankAccount.setClients(Set.of(client));

        while(true) {
            String depositPercentageBankAccountNumber = generateDepositBankAccountNumber();
            BankAccount bankAccount = bankAccountRepository.findAll().stream().filter(b -> b.getNumber().equals(depositPercentageBankAccountNumber)).findFirst().orElse(null);

            if (bankAccount != null) {
                continue;
            }
            else {
                depositPercentageBankAccount.setNumber(depositPercentageBankAccountNumber);
                break;
            }
        }

        bankAccountRepository.save(creditMainBankAccount);
        bankAccountRepository.save(creditPayBankAccount);
        bankAccountRepository.save(depositMainBankAccount);
        bankAccountRepository.save(depositPercentageBankAccount);

        bankAccounts.add(creditMainBankAccount);
        bankAccounts.add(creditPayBankAccount);
        bankAccounts.add(depositMainBankAccount);
        bankAccounts.add(depositPercentageBankAccount);

        return bankAccounts;
    }

    private String generateDepositBankAccountNumber() {
        return "3014" + new Random().nextInt(89999999 + 1) + "0";
    }

    private String generateCreditBankAccountNumber() {
        return "2400" + new Random().nextInt(89999999 + 1) + "0";
    }
    
    
}
