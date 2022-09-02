package com.products.backend.Models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Category {
    @Id
    @GeneratedValue
    private Long id;
    private String name;

    public Category() {
    }
    public Category(String name){
        this.name = name;
    }
}
