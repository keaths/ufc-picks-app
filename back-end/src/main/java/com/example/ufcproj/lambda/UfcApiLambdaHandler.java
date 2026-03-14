package com.example.ufcproj.lambda;

import com.amazonaws.serverless.proxy.spring.SpringBootLambdaContainerHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;
import com.example.ufcproj.UfcprojApplication;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class UfcApiLambdaHandler implements RequestStreamHandler {

    private static final SpringBootLambdaContainerHandler<?, ?> handler;

    static {
        try {
            handler = SpringBootLambdaContainerHandler.getHttpApiV2ProxyHandler(UfcprojApplication.class);
        } catch (Exception e) {
            throw new RuntimeException("Could not initialize Spring Boot application", e);
        }
    }

    @Override
    public void handleRequest(InputStream input, OutputStream output, Context context) throws IOException {
        handler.proxyStream(input, output, context);
    }
}

