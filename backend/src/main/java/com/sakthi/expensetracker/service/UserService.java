package com.sakthi.expensetracker.service;

import com.sakthi.expensetracker.model.User;
import com.sakthi.expensetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Optional<User> findByEmailId(String emailId) {
        return userRepository.findByEmailId(emailId);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }
}
