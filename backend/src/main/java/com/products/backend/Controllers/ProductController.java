package com.products.backend.Controllers;

import com.products.backend.Contracts.ProductRequest;
import com.products.backend.Errors.EntityNotFoundException;
import com.products.backend.Models.Product;
import com.products.backend.Repository.CategoryRepository;
import com.products.backend.Repository.ProductRepository;
import com.products.backend.Services.FileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/")
public class ProductController {
    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final FileStorageService fileStorageService;

    public ProductController(
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            FileStorageService fileStorageService) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping("/products")
    List<Product> getAll() {
        return productRepository.findAll();
    }

    @GetMapping("/products/{id}")
    Product get(@PathVariable Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id));
    }

    @PostMapping("/products")
    ResponseEntity<?> post(ProductRequest productRequest) {
        var category = categoryRepository.findById(productRequest.getCategory())
                .orElseThrow(() -> new EntityNotFoundException(productRequest.getCategory()));

        if (!productRequest.getImage().isEmpty()) {
            String fileDownloadUri = getFileUrl(productRequest);

            var newProduct = new Product();
            newProduct.setName(productRequest.getName());
            newProduct.setImage(fileDownloadUri);
            newProduct.setCategory(category);

            return new ResponseEntity<>(productRepository.save(newProduct), HttpStatus.OK);
        }

        return new ResponseEntity<>("Something went wrong :(", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/products/{id}")
    ResponseEntity<?> put(ProductRequest productRequest, @PathVariable Long id) {
        var category = categoryRepository.findById(productRequest.getCategory())
                .orElseThrow(() -> new EntityNotFoundException(productRequest.getCategory()));

        return productRepository.findById(id)
                .map(product -> {
                    product.setName(productRequest.getName());
                    product.setCategory(category);
                    if (productRequest.getImage() != null && !productRequest.getImage().isEmpty()) {
                        String fileDownloadUri = getFileUrl(productRequest);
                        product.setImage(fileDownloadUri);
                    }
                    return new ResponseEntity<>(productRepository.save(product), HttpStatus.OK);
                }).orElseThrow(() -> new EntityNotFoundException(id));
    }

    @GetMapping("/products/image/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @DeleteMapping("/products/{id}")
    void delete(@PathVariable Long id) {
        productRepository.deleteById(id);
    }

    private String getFileUrl(ProductRequest productRequest) {
        var filename = fileStorageService.storeFile(productRequest.getImage());
        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("api/products/image/")
                .path(filename)
                .toUriString();
    }
}
