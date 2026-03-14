package com.example.ufcproj.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.example.ufcproj.UfcprojApplication;
import com.example.ufcproj.jobs.UfcUpdateJobService;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ApplicationContext;

import java.io.IOException;
import java.util.Map;

public class UfcLambdaHandler implements RequestHandler <Map<String, Object>,String>{

    private static final ApplicationContext springContext =
            new SpringApplicationBuilder(UfcprojApplication.class).run();

    @Override
    public String handleRequest(Map<String, Object> input, Context context) {
        UfcUpdateJobService jobService = springContext.getBean(UfcUpdateJobService.class);

        String mode = (String) input.getOrDefault("mode", "DAILY");

        if("POLL".equalsIgnoreCase(mode)){
            try {
                jobService.runPollToday();
            } catch (InterruptedException | IOException e) {
                throw new RuntimeException(e);
            }
        } else{
            try {
                jobService.runDailyRefresh();
            } catch (InterruptedException | IOException e) {
                throw new RuntimeException(e);
            }
        }
        return "Done";
    }
}
