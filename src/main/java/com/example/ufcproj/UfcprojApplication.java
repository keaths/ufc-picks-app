package com.example.ufcproj;


import com.example.ufcproj.jobs.UfcUpdateJobService;
import com.example.ufcproj.repository.EventRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.io.IOException;


@SpringBootApplication
@EnableJpaRepositories
public class UfcprojApplication {

	public static void main(String[] args) throws IOException, InterruptedException {
		SpringApplication.run(UfcprojApplication.class, args);
	}

//	@Bean
//	public CommandLineRunner runAfterStartup(UfcUpdateJobService jobService) {
//		return args -> {
//			System.out.println("Running daily refresh locally...");
//			jobService.runDailyRefresh();
//		};
//	}
}
