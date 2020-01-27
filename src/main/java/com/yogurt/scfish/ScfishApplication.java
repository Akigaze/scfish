package com.yogurt.scfish;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ScfishApplication {

	public static void main(String[] args) {
		SpringApplication.run(ScfishApplication.class, args);
	}

}
