package com.products.backend.Controllers;

import com.products.backend.Errors.EntityNotFoundException;
import com.products.backend.Models.Category;
import com.products.backend.Repository.CategoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class CategoryController {
    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/categories")
    List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @GetMapping("/categories/{id}")
    Category get(@PathVariable Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id));
    }

    @PostMapping("/categories")
    Category post(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    @PutMapping("/categories/{id}")
    Category put(@RequestBody Category category, @PathVariable Long id) {
        return categoryRepository.findById(id)
                .map(c -> {
                    c.setName(category.getName());
                    return categoryRepository.save(c);
                })
                .orElseGet(() -> {
                    category.setId(id);
                    return categoryRepository.save(category);
                });
    }

    @DeleteMapping("/categories/{id}")
    void delete(@PathVariable Long id) {
        categoryRepository.deleteById(id);
    }
}
