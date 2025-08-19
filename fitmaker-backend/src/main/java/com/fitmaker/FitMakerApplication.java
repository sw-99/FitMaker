package com.fitmaker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
public class FitMakerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FitMakerApplication.class, args);
	}

}
