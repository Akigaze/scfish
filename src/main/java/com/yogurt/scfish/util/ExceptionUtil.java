package com.yogurt.scfish.util;

import java.io.PrintWriter;
import java.io.StringWriter;

public class ExceptionUtil {

  public static String getStackTrace(Throwable t){
    StringWriter sw = new StringWriter();
    PrintWriter writer = new PrintWriter(sw, true);
    t.printStackTrace(writer);
    return sw.getBuffer().toString();
  }
}
