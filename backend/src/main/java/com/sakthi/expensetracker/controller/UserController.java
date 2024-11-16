package com.sakthi.expensetracker.controller;

import com.sakthi.expensetracker.model.SignInRequest;
import com.sakthi.expensetracker.model.User;
import com.sakthi.expensetracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map> registerUser(@RequestBody User user) {
        Map<String, Object> userResponse = new HashMap<>();
        if (user.getPassword() == null || !user.getPassword().equals(user.getConfirmPassword())) {
            userResponse.put("msg", "Passwords do not match");
            return ResponseEntity.badRequest().body(userResponse);
        }

        if (userService.findByEmailId(user.getEmailId()).isPresent()) {
            userResponse.put("msg", "Email already registered");
            return ResponseEntity.badRequest().body(userResponse);
        }

        userService.saveUser(user);
        userResponse.put("id", user.getId());
        userResponse.put("msg", "User registered successfully");
        return ResponseEntity.ok(userResponse);
    }

    @PostMapping("/signin")
    public ResponseEntity<Map<String, Object>> signInUser(@RequestBody SignInRequest signInRequest) {
        Optional<User> optionalUser = userService.findByEmailId(signInRequest.getEmailId());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getPassword().equals(signInRequest.getPassword())) {
                // Create a simple map containing id and name
                Map<String, Object> userResponse = new HashMap<>();
                userResponse.put("id", user.getId());
                userResponse.put("name", user.getName());
                return ResponseEntity.ok(userResponse);
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("error", "Invalid password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("error", "User not found");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
