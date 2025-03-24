package com.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration
public class SpringApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringApiApplication.class, args);
    }
}
