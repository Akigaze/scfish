package com.yogurt.scfish.security.authorization;

import com.yogurt.scfish.security.support.UserDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Authorization {
  private UserDetail userDetail;
}