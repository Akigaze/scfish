package com.yogurt.scfish.service;

import com.yogurt.scfish.entity.Image;
import com.yogurt.scfish.repository.ImageRepository;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import sun.misc.BASE64Encoder;

import java.awt.font.ImageGraphicAttribute;
import java.util.*;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ImageService {
  private ImageRepository imageRepository;

  public void saveImg(@NonNull Integer postId, @NonNull Integer index, @NonNull byte[] img){
    Image image = new Image();
    image.setImg(img);
    image.setPicIndex(index);
    image.setPostId(postId);
    imageRepository.save(image);
  }

  public List<String> getImgs(@NonNull Integer postId){
    Pageable pageable = PageRequest.of(0,6,new Sort(Sort.Direction.ASC,"picIndex"));
    Page<Image> imgPage = imageRepository.findAllByPostId(postId,pageable);
    if (imgPage.isEmpty()){
      return null;
    }
    List<String> list = new ArrayList<>();
    BASE64Encoder base64 = new BASE64Encoder();
    imgPage.map(image -> {
      list.add(base64.encode(image.getImg()));
      return image;
    });
    return list;
  }

  public void deleteImgs(@NonNull Integer postId){
    imageRepository.findAllByPostId(postId,null).map(value->{
      imageRepository.delete(value);
      return null;
    });
  }
}
