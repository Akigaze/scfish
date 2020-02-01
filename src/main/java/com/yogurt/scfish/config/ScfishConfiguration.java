package com.yogurt.scfish.config;

import com.yogurt.scfish.config.filter.CorsFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;

@Configuration
public class ScfishConfiguration {

  @Bean
  public FilterRegistrationBean<CorsFilter> corsFilter() {
    FilterRegistrationBean<CorsFilter> corsFilter = new FilterRegistrationBean<>();

    corsFilter.setOrder(Ordered.HIGHEST_PRECEDENCE + 10);
    corsFilter.setFilter(new CorsFilter());
    corsFilter.addUrlPatterns("/scfish/*");

    return corsFilter;
  }

}
