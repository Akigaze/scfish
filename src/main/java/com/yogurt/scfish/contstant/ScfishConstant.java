package com.yogurt.scfish.contstant;

import org.springframework.http.HttpHeaders;

public class ScfishConstant {
  public static final String SCFISH_TOKEN_HEADER_NAME = "Scfish-" + HttpHeaders.AUTHORIZATION;
  public static final String ACCESS_TOKEN_HEADER_NAME = "Access-" + HttpHeaders.AUTHORIZATION;
  public static final String ACCESS_TOKEN_REQUEST_PARAM_NAME = "access_token";

  public static final String DEFAULT_PAGE_SIZE_OF_POST = "10";
  public static final String DEFAULT_PAGE_SIZE_OF_COMMENT = "10";
}
