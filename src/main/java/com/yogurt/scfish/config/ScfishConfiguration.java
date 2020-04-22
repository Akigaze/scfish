package com.yogurt.scfish.config;

import com.yogurt.scfish.cache.InMemoryCacheStore;
import com.yogurt.scfish.cache.StringCacheStore;
import com.yogurt.scfish.config.filter.AdminAuthorizationFilter;
import com.yogurt.scfish.config.filter.CorsFilter;
import com.yogurt.scfish.config.filter.LoginFilter;
import com.yogurt.scfish.config.filter.ManagerFilter;
import com.yogurt.scfish.config.handler.AuthorizationFailureHandler;
import com.yogurt.scfish.config.handler.DefaultAuthorizationFailureHandler;
import com.yogurt.scfish.service.ManagerService;
import com.yogurt.scfish.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;


@Configuration
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ScfishConfiguration {

  @Bean
  public StringCacheStore cacheStore(){
    return new InMemoryCacheStore();
  }

  @Bean
  public FilterRegistrationBean<CorsFilter> corsFilter() {
    FilterRegistrationBean<CorsFilter> corsFilter = new FilterRegistrationBean<>();

    corsFilter.setOrder(Ordered.HIGHEST_PRECEDENCE + 10);
    corsFilter.setFilter(new CorsFilter());
    corsFilter.addUrlPatterns("/scfish/*");

    return corsFilter;
  }

  @Bean
  public FilterRegistrationBean<LoginFilter> loginFilter(StringCacheStore cacheStore) {
    FilterRegistrationBean<LoginFilter> loginFilter = new FilterRegistrationBean<>();

    loginFilter.setOrder(-1);
    loginFilter.setFilter(new LoginFilter(cacheStore));
    loginFilter.addUrlPatterns("/scfish/admin/login");

    return loginFilter;
  }

  @Bean
  public FilterRegistrationBean<AdminAuthorizationFilter> adminAuthorizationFilter(
      StringCacheStore cacheStore,
      UserService userService){
    AuthorizationFailureHandler failureHandler = new DefaultAuthorizationFailureHandler();
    AdminAuthorizationFilter filter = new AdminAuthorizationFilter(cacheStore, userService, failureHandler);

    filter.addExcludePathPatterns(
        "/scfish/admin/login",
        "/scfish/admin/register",
        "/scfish/admin/refresh/*"
    );

    FilterRegistrationBean<AdminAuthorizationFilter> registrationBean = new FilterRegistrationBean<>();
    registrationBean.setFilter(filter);
    registrationBean.addUrlPatterns("/scfish/*");
    registrationBean.setOrder(1);

    return registrationBean;
  }

  @Bean
  public FilterRegistrationBean<ManagerFilter> managerFilter(ManagerService managerService){
    FilterRegistrationBean<ManagerFilter> managerFilter = new FilterRegistrationBean<>();
    managerFilter.setOrder(Ordered.LOWEST_PRECEDENCE);
    managerFilter.setFilter(new ManagerFilter(managerService));
    managerFilter.addUrlPatterns("/scfish/manager/*");
    return managerFilter;
  }
}
