package com.yogurt.scfish.contstant;

import org.springframework.http.HttpHeaders;

public class ScfishConstant {
  public static final String SCFISH_TOKEN_HEADER_NAME = "Scfish-" + HttpHeaders.AUTHORIZATION;
  public static final String ACCESS_TOKEN_HEADER_NAME = "Access-" + HttpHeaders.AUTHORIZATION;
  public static final String ACCESS_TOKEN_REQUEST_PARAM_NAME = "access_token";
}
