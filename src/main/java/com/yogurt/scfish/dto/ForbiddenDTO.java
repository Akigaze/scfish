package com.yogurt.scfish.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.yogurt.scfish.dto.base.OutputConverter;
import com.yogurt.scfish.entity.Forbidden;
import lombok.Data;

import java.time.LocalDateTime;


@Data
public class ForbiddenDTO implements OutputConverter<ForbiddenDTO, Forbidden> {
  private Integer id;
  private String username;
  private String nickname;
  private String type;
  private String remark;
  private boolean isForbidden;
  @JsonFormat(pattern="yyyy-MM-dd hh:mm")
  private LocalDateTime startTime;
}
