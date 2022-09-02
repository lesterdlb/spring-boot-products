package com.products.backend.Data;

import com.products.backend.Models.Category;
import com.products.backend.Models.User;
import com.products.backend.Repository.CategoryRepository;
import com.products.backend.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(
            CategoryRepository categoryRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {

        List<Category> categories = List.of(
                new Category("Category A"),
                new Category("Category B"),
                new Category("Category C"));

        List<User> users = List.of(
                new User("frodo@mail.com", passwordEncoder.encode("123qwe")),
                new User("gandalf@mail.com", passwordEncoder.encode("123qwe"))
        );

        for (Category category : categories) {
            if (!categoryRepository.existsByName(category.getName())) {
                log.info("Preloading " + categoryRepository.save(category));
            }
        }

        for (User user : users) {
            if (!userRepository.existsByEmail(user.getEmail())) {
                log.info("Preloading " + userRepository.save(user));
            }
        }

        return args -> {

        };
    }
}
