package com.yogurt.scfish.dto.param;

import com.yogurt.scfish.dto.base.InputConverter;
import com.yogurt.scfish.entity.Forbidden;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ForbiddenParam implements InputConverter<Forbidden> {
  private String username;
  private String remark;
  private String type;
}
