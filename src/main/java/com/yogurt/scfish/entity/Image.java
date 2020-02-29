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
@Table(name = "image")
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
public class Image extends BaseEntity{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  @Lob
  @Basic(fetch = FetchType.LAZY)
  @Column(name="thumbnail", columnDefinition="Blob", nullable=true)
  private byte[] thumbnail;
  @Lob
  @Basic(fetch = FetchType.LAZY)
  @Column(name="img", columnDefinition="MediumBlob", nullable=true)
  private byte[] img;
  private int picIndex;
  private Integer postId;
}
