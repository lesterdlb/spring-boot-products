package com.products.backend.Errors;

public class EntityNotFoundException extends RuntimeException {

    public EntityNotFoundException(Long id) {
        super("Could not find the entity " + id);
    }
}