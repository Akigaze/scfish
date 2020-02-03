package com.yogurt.scfish.security.context;

import org.springframework.lang.NonNull;

public class SecurityContextHolder {
  private final static ThreadLocal<SecurityContext> CONTEXT_HOLDER = new ThreadLocal<>();

  public static void setContext(@NonNull SecurityContext securityContext){
    CONTEXT_HOLDER.set(securityContext);
  }

  public static SecurityContext getContext(){
    SecurityContext securityContext = CONTEXT_HOLDER.get();
    if (securityContext == null){
      securityContext = createEmptyContext();
      setContext(securityContext);
    }
    return securityContext;
  }

  public static void clearContext(){
    CONTEXT_HOLDER.remove();
  }

  private static SecurityContext createEmptyContext() {
    return new SecurityContext();
  }

}
