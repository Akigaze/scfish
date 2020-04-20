package com.yogurt.scfish.config.swagger;

import com.google.common.collect.Sets;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Parameter;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.OperationsSorter;
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger.web.UiConfigurationBuilder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

import static com.yogurt.scfish.contstant.ScfishConstant.ACCESS_TOKEN_HEADER_NAME;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

  @Bean
  public Docket docket() {
    ApiInfo apiInfo = new ApiInfoBuilder()
      .title("Scfish API Document")
      .version("0.1")
      .description("restful api of scfish")
      .build();

    Parameter authParameter = new ParameterBuilder()
      .name(ACCESS_TOKEN_HEADER_NAME)
      .parameterType("header")
      .modelRef(new ModelRef("string"))
      .description("Token for accessing to use API")
      .defaultValue("Basic Token")
      .required(true)
      .build();

    return new Docket(DocumentationType.SWAGGER_2)
      .apiInfo(apiInfo)
      .globalOperationParameters(Collections.singletonList(authParameter))
      .consumes(Sets.newHashSet("application/json"))
      .produces(Sets.newHashSet("application/json"))
      .select()
      .apis(RequestHandlerSelectors.basePackage("com.yogurt.scfish.controller"))
      .paths(PathSelectors.any())
      .build();
  }

  @Bean
  public UiConfiguration uiConfiguration() {
    return UiConfigurationBuilder.builder()
      .displayRequestDuration(true)
      .operationsSorter(OperationsSorter.METHOD)
      .build();
  }
}
