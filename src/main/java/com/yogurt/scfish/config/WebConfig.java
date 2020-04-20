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

  public final String[] viewPaths = {"/", "/login", "/post", "modify", "/publish", "/information"};

  // 跳转的映射配置
  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    for (String path : viewPaths) {
      registry.addViewController(path).setViewName("forward:/index.html");
    }
  }

  // 配置资源文件的映射路径
  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/**").addResourceLocations("classpath:/dist/");
    registry.addResourceHandler("swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
    registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
  }

  // 配置请求拦截器
  @Override
  public void addInterceptors(InterceptorRegistry registry) {
//    registry.addInterceptor(new WebInterceptor())
//        .addPathPatterns("/**", "/")
//        .excludePathPatterns(excludePathPatterns);
  }


}
