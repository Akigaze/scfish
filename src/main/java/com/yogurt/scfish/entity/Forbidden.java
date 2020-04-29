package com.yogurt.scfish.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@Entity
@Table(name="forbidden")
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
public class Forbidden extends BaseEntity{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  private String type;
  private boolean withdraw;
  private String remark;

  @ManyToOne(targetEntity = User.class, cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
  @JoinColumn(name = "username")
  private User user;
}
