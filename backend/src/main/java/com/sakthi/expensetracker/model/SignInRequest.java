package com.sakthi.expensetracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInRequest {
    private String emailId;
    private String password;
    private Long id; // Field for user ID
    private String phoneNumber; // Field for phone number
    private String name;

}
