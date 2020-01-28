package com.yogurt.scfish.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Value("${scfish.mvc.exclude-path-patterns}")
  private String[] excludePathPatterns;

  // 跳转的映射配置
  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    registry.addViewController("/").setViewName("index");
    registry.addViewController("/index").setViewName("index");
    registry.addViewController("/login").setViewName("login");
    registry.addViewController("/register").setViewName("register");
    registry.addViewController("/publish").setViewName("publish");
  }

  // 配置资源文件的映射路径
  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // registry.addResourceHandler("/demo/**").addResourceLocations("classpath:/");
  }

  // 配置请求拦截器
  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new WebInterceptor())
        .addPathPatterns("/**", "/")
        .excludePathPatterns(excludePathPatterns);
  }
}
