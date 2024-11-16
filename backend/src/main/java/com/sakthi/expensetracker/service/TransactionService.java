package com.sakthi.expensetracker.service;

import com.sakthi.expensetracker.model.Transaction;
import com.sakthi.expensetracker.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

        @Autowired
        private TransactionRepository transactionRepository;

        public void addTransaction(Transaction transaction) {
            transactionRepository.save(transaction);
        }

        public List<Transaction> getTransactionsByUserId(Long userId) {
            return transactionRepository.findByUserId(userId);
        }

        public Optional<Transaction> getTransactionById(Long id) {
            return transactionRepository.findById(id);
        }

        public void updateTransaction(Transaction transaction) {
            transactionRepository.save(transaction);
        }

        public void deleteTransaction(Long id) {
            transactionRepository.deleteById(id);
        }
}
