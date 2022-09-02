package com.products.backend.Models;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"email"})})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String email;
    private String password;
    private String role = "ROLE_USER";

    public User() {
    }
    public User(String email, String password){

        this.email = email;
        this.password = password;
    }
}
