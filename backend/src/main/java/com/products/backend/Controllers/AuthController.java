package com.products.backend.Controllers;

import com.products.backend.Contracts.LoginRequest;
import com.products.backend.Models.User;
import com.products.backend.Repository.UserRepository;
import com.products.backend.Services.JwtUserDetailsService;
import com.products.backend.Utils.JwtTokenUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtUserDetailsService userDetailsService;
    private final JwtTokenUtil jwtTokenUtil;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, JwtUserDetailsService userDetailsService, JwtTokenUtil jwtTokenUtil) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.userDetailsService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> responseMap = new HashMap<>();

        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            if (authentication.isAuthenticated()) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
                String token = jwtTokenUtil.generateToken(userDetails);
                responseMap.put("email", userDetails.getUsername());
                responseMap.put("token", token);
                return ResponseEntity.ok(responseMap);
            }
        } catch (Exception ex) {
            responseMap.put("message", "Something went wrong :(");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMap);
        }

        responseMap.put("message", "Invalid Credentials");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMap);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest registerRequest) {
        Map<String, Object> responseMap = new HashMap<>();

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            responseMap.put("message", "Email is already registered!");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(responseMap);
        }

        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(registerRequest.getPassword()));

        userRepository.save(user);

        responseMap.put("username", registerRequest.getEmail());
        responseMap.put("message", "Account created successfully");
        return ResponseEntity.ok(responseMap);
    }
//    @GetMapping("/user")
//    public Principal user(Principal user) {
//        return user;
//    }
}
