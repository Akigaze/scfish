package com.yogurt.scfish.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
public class User extends BaseEntity {
  @Id
  private String username;
  private String nickname;
  private String password;
  private boolean deleted;
  @Lob
  @Basic(fetch = FetchType.LAZY)
  @Column(name="avatar", columnDefinition="MediumBlob", nullable=true)
  private byte[] avatar;

}
