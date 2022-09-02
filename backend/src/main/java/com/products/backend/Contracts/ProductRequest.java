package com.products.backend.Contracts;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProductRequest {
    private MultipartFile image;
    private String name;
    private Long category;
}
